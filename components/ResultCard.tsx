// file: components/ResultCard.tsx

interface ResultCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ResultCard({ title, children }: ResultCardProps) {
  return (
    <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-xl p-6 mt-8 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-green-400 mb-4">{title}</h2>
      <div className="text-gray-200 leading-relaxed">{children}</div>
    </div>
  );
}
