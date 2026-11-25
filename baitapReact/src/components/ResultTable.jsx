function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [editing, setEditing] = React.useState(null);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể tải danh sách người dùng.");
        }

        return response.json();
      })
      .then((data) => setUsers(data))
      .catch(() => setError("Không thể tải danh sách người dùng."))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    setUsers((currentUsers) => {
      const nextId =
        currentUsers.length > 0
          ? Math.max(...currentUsers.map((currentUser) => currentUser.id)) + 1
          : 1;

      return [...currentUsers, { ...user, id: nextId }];
    });
    onAdded();
  }, [user]);

  function editUser(currentUser) {
    setEditing({
      ...currentUser,
      address: { ...currentUser.address },
    });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditing((currentEditing) => {
      if (["street", "suite", "city"].includes(name)) {
        return {
          ...currentEditing,
          address: {
            ...currentEditing.address,
            [name]: value,
          },
        };
      }

      return {
        ...currentEditing,
        [name]: value,
      };
    });
  }

  function saveUser(event) {
    event.preventDefault();

    if (!editing.name.trim() || !editing.username.trim()) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((currentUser) =>
        currentUser.id === editing.id ? editing : currentUser,
      ),
    );
    setEditing(null);
  }

  function removeUser(id) {
    setUsers((currentUsers) =>
      currentUsers.filter((currentUser) => currentUser.id !== id),
    );
  }

  const normalizedKeyword = keyword.trim().toLowerCase();
  const filteredUsers = users.filter(
    (currentUser) =>
      currentUser.name.toLowerCase().includes(normalizedKeyword) ||
      currentUser.username.toLowerCase().includes(normalizedKeyword),
  );

  if (loading) {
    return <p className="status-message">Đang tải dữ liệu...</p>;
  }

  if (error) {
    return (
      <p className="status-message status-error" role="alert">
        {error}
      </p>
    );
  }

  return (
    <>
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((currentUser) => (
                <tr key={currentUser.id}>
                  <td>{currentUser.id}</td>
                  <td>{currentUser.name}</td>
                  <td>{currentUser.username}</td>
                  <td>{currentUser.email}</td>
                  <td>
                    {currentUser.address.street}, {currentUser.address.suite},{" "}
                    {currentUser.address.city}
                  </td>
                  <td>{currentUser.phone}</td>
                  <td className="table-actions">
                    <button
                      type="button"
                      className="btn btn-edit"
                      onClick={() => editUser(currentUser)}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() => removeUser(currentUser.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="empty-message" colSpan="7">
                  Không tìm thấy người dùng phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <UserForm
          title="Sửa người dùng"
          user={editing}
          submitLabel="Lưu"
          idPrefix="edit-user"
          onChange={handleEditChange}
          onSubmit={saveUser}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  );
}
