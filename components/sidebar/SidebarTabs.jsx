export default function SidebarTabs() {
  return (
    <div className="border">
      <div className="grid grid-cols-3 text-sm font-semibold border-b">
        <button className="py-2 border-b-2 border-red-500">Popular</button>
        <button className="py-2">Recents</button>
        <button className="py-2">Comments</button>
      </div>

      <div className="p-4 text-sm text-gray-500">Tab content goes here…</div>
    </div>
  );
}
