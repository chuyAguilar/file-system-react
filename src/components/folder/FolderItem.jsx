import "./FolderItem.css";
import { useEffect, useRef } from 'react';


export function FolderItem(props) {
    const { id, name, onOpen, onDelete, isEditing,
        editingValue, onStartEdit, onChangeEdit,
        onSaveEdit, onCancelEdit } = props;

    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    let UI = null;

    if (isEditing === false) {
        UI = (
            <div
                className="card folder-card"
                onClick={() => onOpen(id)}
            >
                <div className="folder-content">
                    <div className="folder-icon">📁</div>

                    <div className="folder-body">
                        <div className="folder-name">{name}</div>

                        <div className="folder-actions">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onStartEdit(id);
                                }}
                            >
                                Editar
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(id);
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        UI =
            <div className="card folder-card editing">
                <div className="folder-content">
                    <div className="folder-icon">📁</div>

                    <div className="folder-body">
                        <input
                            ref={inputRef}
                            className="folder-input"
                            value={editingValue}
                            onChange={(e) => onChangeEdit(e.target.value)}
                        />

                        <div className="folder-actions">
                            <button className="button-primary" onClick={() => onSaveEdit(id)}>
                                Guardar
                            </button>

                            <button onClick={onCancelEdit}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    }

    return UI;

}
