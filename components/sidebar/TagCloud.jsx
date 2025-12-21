export default function TagCloud() {
  const tags = [
    "Travel",
    "Music",
    "Business",
    "Photography",
    "Sports",
    "Lifestyle",
  ];

  return (
    <div className="border p-4">
      <h4 className="font-bold text-sm mb-3 uppercase">Main Tags</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border px-3 py-1 text-xs hover:bg-red-500 hover:text-white cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
