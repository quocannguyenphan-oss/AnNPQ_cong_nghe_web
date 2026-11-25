function UserForm({
  title,
  user,
  submitLabel,
  idPrefix,
  onChange,
  onSubmit,
  onCancel,
}) {
  const addressFields = ["street", "suite", "city"];
  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "street", label: "Street", type: "text" },
    { name: "suite", label: "Suite", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "website", label: "Website", type: "text" },
  ];
  const titleId = `${idPrefix}-form-title`;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId}>{title}</h2>

        <form className="user-form" onSubmit={onSubmit}>
          <div className="form-grid">
            {fields.map((field) => {
              const inputId = `${idPrefix}-${field.name}`;
              const value = addressFields.includes(field.name)
                ? user.address[field.name]
                : user[field.name];

              return (
                <div className="form-group" key={field.name}>
                  <label htmlFor={inputId}>{field.label}:</label>
                  <input
                    id={inputId}
                    name={field.name}
                    type={field.type}
                    value={value}
                    onChange={onChange}
                  />
                </div>
              );
            })}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {submitLabel}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
