// file: components/ArticleCard.tsx

interface ArticleCardProps {
  title?: string;
  link?: string;
  snippet?: string;
}

export default function ArticleCard({
  title,
  link,
  snippet,
}: ArticleCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
    >
      <h3 className="text-green-400 font-semibold group-hover:underline">
        {title}
      </h3>
      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{snippet}</p>
      <p className="text-xs text-gray-500 mt-2 truncate">{link}</p>
    </a>
  );
}
