export default function Categories() {
  const cats = ["Business", "Economy", "Technology", "Showbiz"];

  return (
    <div className="border dark:border-gray-700 bg-white dark:bg-gray-800">
      <h4 className="font-bold text-sm px-4 py-3 border-b dark:border-gray-700 uppercase text-gray-900 dark:text-gray-100">
        Categories
      </h4>
      <ul className="p-4 space-y-2 text-sm">
        {cats.map((c) => (
          <li key={c} className="flex justify-between text-gray-900 dark:text-gray-100">
            <span>{c}</span>
            <span className="text-gray-400 dark:text-gray-500">(0)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
