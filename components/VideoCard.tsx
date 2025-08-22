// file: components/VideoCard.tsx

interface VideoCardProps {
  id?: string;
  title?: string;
  thumbnail?: string;
}

export default function VideoCard({ id, title, thumbnail }: VideoCardProps) {
  if (!id) return null;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-auto rounded-lg object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-300 group-hover:text-green-400 transition-colors duration-200">
        {title}
      </p>
    </a>
  );
}
