export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Meklēt produktu..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="searchbar-input"
      />
    </div>
  );
}
