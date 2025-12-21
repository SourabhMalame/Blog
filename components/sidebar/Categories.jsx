export default function Categories() {
  const cats = ["Business", "Economy", "Technology", "Showbiz"];

  return (
    <div className="border">
      <h4 className="font-bold text-sm px-4 py-3 border-b uppercase">
        Categories
      </h4>
      <ul className="p-4 space-y-2 text-sm">
        {cats.map((c) => (
          <li key={c} className="flex justify-between">
            <span>{c}</span>
            <span className="text-gray-400">(0)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
