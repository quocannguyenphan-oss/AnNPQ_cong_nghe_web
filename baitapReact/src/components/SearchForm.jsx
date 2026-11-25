function SearchForm({ onChangeValue }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Tìm theo name, username"
      aria-label="Tìm kiếm người dùng"
      onChange={(event) => onChangeValue(event.target.value)}
    />
  );
}
