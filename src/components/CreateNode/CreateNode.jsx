import { useState } from 'react'
import { useEffect, useRef } from 'react';
import "./CreateNode.css";


export function CreateNode(props) {
    const { value, onChange, onSave, onCancel } = props

    const [creatingType, setCreatingType] = useState("folder")

    const isValidName = value.trim() !== ""

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="card create-card">
            <div className="create-header">
                <button
                    className={`type-toggle ${creatingType === "file" ? "active" : ""}`}
                    onClick={() => setCreatingType("file")}
                >
                    Archivo
                </button>

                <button
                    className={`type-toggle ${creatingType === "folder" ? "active" : ""}`}
                    onClick={() => setCreatingType("folder")}
                >
                    Carpeta
                </button>
            </div>

            <div className="create-content">
                <div className="create-icon">
                    {creatingType === "folder" ? "📁" : "📄"}
                </div>

                <div className="create-body">
                    <input
                        ref={inputRef}
                        className="create-input"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Nombre..."
                    />

                    <div className="create-actions">
                        <button
                            className="button-primary"
                            disabled={!isValidName}
                            onClick={() => onSave(creatingType, value)}
                        >
                            Guardar
                        </button>

                        <button onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );

}