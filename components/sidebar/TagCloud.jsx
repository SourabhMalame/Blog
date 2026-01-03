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
    <div className="border dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <h4 className="font-bold text-sm mb-3 uppercase text-gray-900 dark:text-gray-100">Main Tags</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border dark:border-gray-600 px-3 py-1 text-xs text-gray-900 dark:text-gray-100 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
