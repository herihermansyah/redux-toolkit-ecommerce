export default function Search() {
  return (
    <div className="px-4">
      <label htmlFor="search"></label>
      <input
        type="search"
        id="search"
        placeholder="search...."
        className=" w-full bg-gray-100 p-1.5 rounded-lg placeholder-gray-400 focus:outline-0"
      />
    </div>
  );
}
