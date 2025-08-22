// file: components/LearningSection.tsx
import ResultCard from "@/components/ResultCard";
import VideoCard from "@/components/VideoCard";
import ArticleCard from "@/components/ArticleCard";
import Loader from "@/components/Loader";

// Type Definitions for the data this component receives
type YouTubeVideo = { id?: string; title?: string; thumbnail?: string };
type Article = { title?: string; link?: string; snippet?: string };

interface LearningSectionProps {
  loading: boolean;
  error: string | null;
  aiExplanation: string | null;
  youtubeVideos: YouTubeVideo[];
  articles: Article[];
}

export default function LearningSection({
  loading,
  error,
  aiExplanation,
  youtubeVideos,
  articles,
}: LearningSectionProps) {
  // A helper variable to check if there are any results to display
  const hasResults =
    aiExplanation || youtubeVideos.length > 0 || articles.length > 0;

  return (
    <div className="w-full max-w-2xl mt-8 space-y-8">
      {/* Display the loader when a search is in progress */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      )}

      {/* Display an error message if the search fails */}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      {/* Display results only if they exist AND we are not currently loading */}
      {hasResults && !loading && (
        <>
          {aiExplanation && (
            <ResultCard title="AI Explanation">
              <p>{aiExplanation}</p>
            </ResultCard>
          )}

          {youtubeVideos.length > 0 && (
            <ResultCard title="Top YouTube Videos">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {youtubeVideos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            </ResultCard>
          )}

          {articles.length > 0 && (
            <ResultCard title="Recommended Articles">
              <div className="space-y-4">
                {articles.map((article) => (
                  <ArticleCard key={article.link} {...article} />
                ))}
              </div>
            </ResultCard>
          )}
        </>
      )}
    </div>
  );
}
