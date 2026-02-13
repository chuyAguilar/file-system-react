import "./FileItem.css";
import { useEffect, useRef } from 'react';

export function FileItem(props) {
    const { id, name, onDelete, isEditing,
        editingValue, onStartEdit, onChangeEdit,
        onSaveEdit, onCancelEdit } = props;

    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);



    let UI = null
    if (isEditing === false) {
        UI = (
            <div className="card file-card">
                <div className="file-preview">
                    <div className="file-preview-label">TXT</div>
                    <div className="file-preview-content">
                        <div className="line"></div>
                        <div className="line short"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="file-body">
                    <div className="file-name">{name}</div>

                    <div className="file-actions">
                        <button onClick={() => onStartEdit(id)}>Editar</button>
                        <button onClick={() => onDelete(id)}>Eliminar</button>
                    </div>
                </div>
            </div>
        );
    }
    else {
        UI =
            <div className="card file-card editing">
                <div className="file-preview">
                    <div className="file-preview-label">TXT</div>
                    <div className="file-preview-content">
                        <div className="line"></div>
                        <div className="line short"></div>
                        <div className="line"></div>
                    </div>
                </div>

                <div className="file-body">
                    <input
                        ref={inputRef}
                        className="file-input"
                        value={editingValue}
                        onChange={(e) => onChangeEdit(e.target.value)}
                    />

                    <div className="file-actions">
                        <button className="button-primary" onClick={() => onSaveEdit(id)}>
                            Guardar
                        </button>

                        <button onClick={onCancelEdit}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
    }

    return UI;
}
