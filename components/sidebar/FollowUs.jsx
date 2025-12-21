export default function FollowUs() {
  return (
    <div className="border">
      <h4 className="font-bold text-sm px-4 py-3 border-b uppercase">
        Follow Us
      </h4>
      <div className="grid grid-cols-2 text-white text-sm font-semibold">
        <div className="bg-blue-600 p-3 text-center">Facebook</div>
        <div className="bg-sky-500 p-3 text-center">Twitter</div>
        <div className="bg-red-600 p-3 text-center">YouTube</div>
        <div className="bg-pink-600 p-3 text-center">Instagram</div>
      </div>
    </div>
  );
}
