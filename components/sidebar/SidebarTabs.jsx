export default function SidebarTabs() {
  return (
    <div className="border dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="grid grid-cols-3 text-sm font-semibold border-b dark:border-gray-700">
        <button className="py-2 border-b-2 border-red-500 text-gray-900 dark:text-gray-100">Popular</button>
        <button className="py-2 text-gray-600 dark:text-gray-400 hover:text-red-500">Recents</button>
        <button className="py-2 text-gray-600 dark:text-gray-400 hover:text-red-500">Comments</button>
      </div>

      <div className="p-4 text-sm text-gray-500 dark:text-gray-400">Tab content goes here…</div>
    </div>
  );
}
