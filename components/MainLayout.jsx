export default function MainLayout({ left, right }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-10">{left}</div>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-4 space-y-8">{right}</aside>
      </div>
    </section>
  );
}
