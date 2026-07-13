import { useState, useEffect } from "react";
import Form from "./Form.jsx";
import List from "./List.jsx";
import "./App.css";

function App() { // 2. Abrimos la llave de la función correctamente
  
  // --- ZONA DE LÓGICA (ESTADOS Y EFECTOS) ---
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  // Cargar items de LocalStorage al iniciar
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  // Guardar en LocalStorage cada vez que items cambie
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // --- FUNCIONES DEL CRUD ---
  const addOrUpdateItem = (value) => {
    if (!value.trim()) {
      alert("Error: El campo no puede estar vacio ni contener solo espacios.");
      return;
    }
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null); // Limpiamos el estado de edición al terminar
    } else {
      setItems([...items, { id: Date.now(), value }]);
    }
  };

  const deleteItem = (id) => {
  const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
  
  if (confirmacion) {
    setItems(items.filter((item) => item.id !== id));
  }
};

  const handleEditItem = (item) => {
    setItemToEdit(item);
  };

 
  return (
    <div className="app-container"> {/* Usamos la clase de los estilos del Commit 1 */}
      <h1 className="app-title">CRUD con LocalStorage</h1>
      
      <Form 
        addOrUpdateItem={addOrUpdateItem} 
        itemToEdit={itemToEdit} 
      />

      
    <p className="item-counter" style={{ textAlign: 'center', fontWeight: 'bold', color: '#7f8c8d', marginBottom: '15px' }}>
      Total de elementos: {items.length}
    </p>
      
      <List 
        items={items} 
        deleteItem={deleteItem} 
        editItem={handleEditItem} 
      />
    </div>
  );
} 

export default App;