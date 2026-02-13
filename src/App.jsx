import { useState, useEffect } from 'react'
import './App.css'
import "./design-system/tokens/tokens.css";
import "./design-system/themes/themes.css";


import { MainArea } from './components/MainArea/MainArea'
import { Header } from './components/header/Header'
import { SideBar } from './components/SideBar/Sidebar';

function App() {

  const [nodes, setNodes] = useState([{ id: 1, type: "folder", parentId: null, name: "Raiz" },
  { id: 2, type: "file", parentId: 1, name: "archivo" },
  { id: 3, type: "folder", parentId: 1, name: "carpeta2" }])

  const [currentFolderId, setCurrentFolderId] = useState(1)
  // const rootNodes = nodes.filter(node => node.parentId === null);
  const childrenOfCurrent = nodes.filter(node => node.parentId === currentFolderId);

  const carpetaActual = nodes.find(node => node.id === currentFolderId);
  const carpetaPadre = carpetaActual ? carpetaActual.parentId : null;

  const [editingNodeId, setEditingNodeId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  }




  function changeCurrentFolder(id) {
    setCurrentFolderId(id)
    console.log("id carpeta actual = " + currentFolderId)
  }

  function crearNodo(tipo, nombre) {

    const maxID = Math.max(...nodes.map(node => node.id))
    const nuevoId = maxID + 1

    const nuevoNodo = {
      id: nuevoId, type: tipo, parentId: currentFolderId,
      name: nombre
    }

    const nuevoArray = [...nodes, nuevoNodo];
    setNodes(nuevoArray)

    setEditingNodeId(null)
    setEditingValue("")

  }

  function handleCreate() {
    setEditingNodeId("__new__")
    setEditingValue("")
  }

  function handleCreateSave(type, name) {
    crearNodo(type, name)
  }



  function collectIdsToDelete(id) {

    let ids = [id]

    let idsParaBorrar = nodes.filter(node => node.parentId === id)

    idsParaBorrar.forEach(child => {
      const childs = collectIdsToDelete(child.id)
      ids = [...ids, ...childs]
    })
    return ids;

  }

  function deleteNode(id) {
    const idsToDelete = collectIdsToDelete(id);

    if (idsToDelete.includes(currentFolderId)) {
      changeCurrentFolder(carpetaPadre)
    }

    const newNodes = nodes.filter(node =>
      !idsToDelete.includes(node.id)
    );

    setNodes(newNodes);
  }

  function editNode(id, nombre) {
    if (nodes.find(node => node.id === id)) {
      const newNodes = nodes.map(node =>
        node.id === id ? { ...node, name: nombre } : node
      );
      setNodes(newNodes)
    }
  }

  function onStartEdit(id) {
    setEditingNodeId(id)
    let nodoEnEdicion = nodes.find(node => node.id === id)
    setEditingValue(nodoEnEdicion.name)
  }

  function onChangeEdit(value) {
    setEditingValue(value)
    console.log(value)
  }

  function onSaveEdit(id) {
    editNode(id, editingValue);

    setEditingNodeId(null)
    setEditingValue("")
  }

  function onCancelEdit() {
    setEditingNodeId(null)
    setEditingValue("")
  }

  function deriveFolderPath(id, nodes) {
    const nodoActual = nodes.find(node => node.id === id);

    if (nodoActual.parentId === null) {
      const raiz = [{ id: nodoActual.id, name: nodoActual.name }];
      return raiz;
    } else {
      const nodoPadre = nodes.find(node => node.id === nodoActual.parentId)
      const pathPadre = deriveFolderPath(nodoPadre.id, nodes)
      const pathActual = { id: nodoActual.id, name: nodoActual.name };
      const newPath = [...pathPadre, pathActual]
      return newPath;
    }


  }

  const breadcrumbPath = deriveFolderPath(currentFolderId, nodes)



  return (
    <>
      <Header
        breadcrumbPath={breadcrumbPath}
        changeCurrentFolder={changeCurrentFolder}
        onCreate={handleCreate}
        toggleTheme={toggleTheme}
      />

      <div className="app-layout">
        <SideBar />

        <main className="app-main">
          <div className='BtnRegresar'>
            {carpetaPadre !== null && (
              <button onClick={() => setCurrentFolderId(carpetaPadre)}>
                Volver
              </button>
            )}
          </div>

          <div className='Nodos'>
            <MainArea
              nodes={childrenOfCurrent}
              onOpenFolder={changeCurrentFolder}
              onCreateSave={handleCreateSave}
              onDeleteNode={deleteNode}
              editingNodeId={editingNodeId}
              editingValue={editingValue}
              onStartEdit={onStartEdit}
              onChangeEdit={onChangeEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          </div>
        </main>
      </div>

    </>
  )
}


export default App
