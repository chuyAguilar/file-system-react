import "./Header.css";


export function Header(props) {
    const { breadcrumbPath, changeCurrentFolder, onCreate, toggleTheme } = props

    return (
        <header className="header">
            <div className="header-top">
                <div className="header-title">
                    Sistema de almacenamiento
                </div>

                <div className="header-center">
                    <input
                        className="header-search"
                        placeholder="Buscar..."
                    />

                    <button className="button-primary" onClick={onCreate}>
                        + Crear
                    </button>

                </div>

                <div className="header-icons">
                    <button
                        className="icon-button"
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                    >
                        🌙
                    </button>

                    <button
                        className="icon-button"
                        aria-label="Usuario"
                    >
                        👤
                    </button>
                </div>

            </div>

            <div className="header-breadcrumb">
                {breadcrumbPath.map((node, index) => (
                    <span key={node.id}>
                        {index === 0 && <span className="breadcrumb-root">/ </span>}
                        <span
                            className="breadcrumb-item"
                            onClick={() => changeCurrentFolder(node.id)}
                        >
                            {node.name}
                        </span>
                        {index < breadcrumbPath.length - 1 && (
                            <span className="breadcrumb-separator"> / </span>
                        )}
                    </span>
                ))}

            </div>
        </header>

    )
}