function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false);
  const [user, setUser] = React.useState(createEmptyUser);

  function createEmptyUser() {
    return {
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
      },
      phone: "",
      website: "",
    };
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((currentUser) => {
      if (["street", "suite", "city"].includes(name)) {
        return {
          ...currentUser,
          address: {
            ...currentUser.address,
            [name]: value,
          },
        };
      }

      return {
        ...currentUser,
        [name]: value,
      };
    });
  }

  function handleAdd(event) {
    event.preventDefault();

    if (!user.name.trim() || !user.username.trim()) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }

    onAdd(user);
    setUser(createEmptyUser());
    setAdding(false);
  }

  function handleCancel() {
    setUser(createEmptyUser());
    setAdding(false);
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setAdding(true)}
      >
        Thêm
      </button>

      {adding && (
        <UserForm
          title="Thêm người dùng"
          user={user}
          submitLabel="Thêm"
          idPrefix="add-user"
          onChange={handleChange}
          onSubmit={handleAdd}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
