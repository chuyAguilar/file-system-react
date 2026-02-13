import { FileItem } from "../file/FileItem"
import { FolderItem } from "../folder/FolderItem"
import { CreateNode } from "../CreateNode/CreateNode"
import "./MainArea.css"

export function MainArea(props) {
    const { nodes, onOpenFolder, onCreateSave, onDeleteNode, editingNodeId
        , editingValue, onStartEdit, onChangeEdit, onSaveEdit, onCancelEdit
    } = props

    const isCreating = editingNodeId === "__new__";


    return (
        <div className="main-area">


            <div className="nodes-grid">
                {isCreating && (
                    <CreateNode
                        value={editingValue}
                        onChange={onChangeEdit}
                        onSave={(type, name) => onCreateSave(type, name)}
                        onCancel={onCancelEdit}
                    />
                )}

                {nodes.map(nodo => {
                    const isEditing = nodo.id === editingNodeId;

                    if (nodo.type === "folder") {
                        return (
                            <FolderItem
                                key={nodo.id}
                                id={nodo.id}
                                name={nodo.name}
                                onOpen={onOpenFolder}
                                onDelete={onDeleteNode}
                                isEditing={isEditing}
                                editingValue={editingValue}
                                onStartEdit={onStartEdit}
                                onChangeEdit={onChangeEdit}
                                onSaveEdit={onSaveEdit}
                                onCancelEdit={onCancelEdit}
                            />
                        );
                    } else {
                        return (
                            <FileItem
                                key={nodo.id}
                                id={nodo.id}
                                name={nodo.name}
                                onDelete={onDeleteNode}
                                isEditing={isEditing}
                                editingValue={editingValue}
                                onStartEdit={onStartEdit}
                                onChangeEdit={onChangeEdit}
                                onSaveEdit={onSaveEdit}
                                onCancelEdit={onCancelEdit}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );

}