// File: app/api/search/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { google, youtube_v3, customsearch_v1 } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// --- Safer API Key Handling ---
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

if (
  !YOUTUBE_API_KEY ||
  !GEMINI_API_KEY ||
  !GOOGLE_SEARCH_API_KEY ||
  !GOOGLE_SEARCH_ENGINE_ID
) {
  throw new Error(
    "One or more API keys are not set in the environment variables."
  );
}

// --- API Client Setup ---
const youtube = google.youtube({ version: "v3", auth: YOUTUBE_API_KEY });
const customsearch = google.customsearch({
  version: "v1",
  auth: GOOGLE_SEARCH_API_KEY,
});
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const languageNameMap: { [key: string]: string } = {
  en: "English",
  es: "Spanish",
  hi: "Hindi",
  fr: "French",
  de: "German",
};

export async function POST(request: NextRequest) {
  try {
    const { topic, language } = await request.json();
    const langCode = language || "en";
    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }
    const fullLanguageName = languageNameMap[langCode] || "English";

    // --- Promise for Gemini AI Explanation ---
    const aiExplanationPromise = model
      .generateContent(
        `Provide a short, 3-5 sentence explanation for the topic: "${topic}". The explanation MUST be in ${fullLanguageName}.`
      )
      .then((res) => res.response.text());

    // --- Promise for Google Search Articles ---
    const googleSearchPromise = customsearch.cse
      .list({
        cx: GOOGLE_SEARCH_ENGINE_ID,
        q: topic,
        num: 4,
        lr: `lang_${langCode}`,
      })
      .then(
        (response: { data: customsearch_v1.Schema$Search }) =>
          response.data.items?.map((item: customsearch_v1.Schema$Result) => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
          })) || []
      );

    // --- Promise for YouTube videos ---
    const youtubeVideosPromise = youtube.search
      .list({
        part: ["snippet"],
        q: topic,
        type: ["video"],
        maxResults: 10,
        relevanceLanguage: langCode,
      })
      .then(
        (response: { data: youtube_v3.Schema$SearchListResponse }) =>
          response.data.items?.map((item: youtube_v3.Schema$SearchResult) => ({
            id: item.id?.videoId,
            title: item.snippet?.title,
            thumbnail: item.snippet?.thumbnails?.high?.url,
          })) || []
      );

    // --- Wait for all promises to settle ---
    let [aiExplanation, articles, youtubeVideos] = await Promise.all([
      aiExplanationPromise,
      googleSearchPromise,
      youtubeVideosPromise,
    ]);

    // --- AI Translation Layer for YouTube Titles ---
    if (youtubeVideos.length > 0 && langCode !== "en") {
      const titlesToTranslate = youtubeVideos.map((video) => video.title || "");
      const translationPrompt = `Translate the following list of video titles to ${fullLanguageName}. Respond ONLY with a valid JSON array of strings, where each string is a translated title. Do not include any other text or explanation. The number of titles in your response MUST match the number of titles I provide.
      Original Titles: ${JSON.stringify(titlesToTranslate)}`;

      const translationResult = await model.generateContent(translationPrompt);
      const translatedText = translationResult.response.text();

      try {
        const cleanedText = translatedText.replace(/```json|```/g, "").trim();
        const translatedTitles = JSON.parse(cleanedText);

        if (
          Array.isArray(translatedTitles) &&
          translatedTitles.length === youtubeVideos.length
        ) {
          youtubeVideos.forEach((video, index) => {
            video.title = translatedTitles[index];
          });
        }
      } catch (e) {
        console.error("Failed to parse translated titles:", e);
      }
    }

    // --- Send the final data ---
    return NextResponse.json({
      message: "Success",
      aiExplanation,
      youtubeVideos,
      articles,
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from APIs" },
      { status: 500 }
    );
  }
}
