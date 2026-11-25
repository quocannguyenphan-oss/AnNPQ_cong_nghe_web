function App() {
  const [keyword, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);

  return (
    <main className="app-container">
      <h1>Quản lý người dùng</h1>

      <div className="toolbar">
        <SearchForm onChangeValue={setKeyword} />
        <AddUser onAdd={setNewUser} />
      </div>

      <ResultTable
        keyword={keyword}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
