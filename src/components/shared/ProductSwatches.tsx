const DUMMY_SWATCHES = [
  { name: "Black", color: "#1a1a1a" },
  { name: "Blonde", color: "#d4b896" },
  { name: "Dark Brown", color: "#4a3728" },
  { name: "Auburn", color: "#6b3410" },
];

interface ProductSwatchesProps {
  colors?: string[];
}

export const ProductSwatches = ({ colors }: ProductSwatchesProps) => {
  const swatches =
    colors && colors.length > 0
      ? colors.slice(0, 4).map((c, i) => ({ name: `Color ${i + 1}`, color: c }))
      : DUMMY_SWATCHES;

  return (
    <div className="flex items-center gap-2">
      {swatches.map((s, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-sm border border-gray-300 flex-shrink-0"
          style={{ backgroundColor: s.color }}
          title={s.name}
        />
      ))}
      <div className="w-5 h-5 rounded-sm border border-gray-300 bg-gray-100 flex items-center justify-center flex-shrink-0">
        <span className="text-gray-600 text-xs font-bold">+</span>
      </div>
    </div>
  );
};
