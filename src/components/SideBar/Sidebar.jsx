import "./SideBar.css";

export function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-item active">🏠 Inicio</div>
        <div className="sidebar-item">🕓 Recientes</div>
        <div className="sidebar-item">⭐ Favoritos</div>
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-item">🗑 Papelera</div>
      </div>

      <div className="sidebar-footer">
        Sistema v1
      </div>
    </aside>
  );
}
