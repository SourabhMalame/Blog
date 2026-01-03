export default function Advertisement() {
  return (
    <div className="border dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-center">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Advertisement</p>
      <div className="bg-gray-100 dark:bg-gray-700 py-8 font-bold text-gray-600 dark:text-gray-300">
        {/* MAGPRO */}
        <p className="text-xs font-normal mt-1">Responsive News & Magazine</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600 transition">
          Download
        </button>
      </div>
    </div>
  );
}
