import { useState, useEffect } from 'react';

function Form({ addOrUpdateItem, itemToEdit }) {
  // Aquí declaramos 'value' para que exista en todo el componente
  const [value, setValue] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      // Si el objeto original usa .text en lugar de .value, cámbialo aquí
      setValue(itemToEdit.value || itemToEdit.text || '');
    } else {
      setValue('');
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateItem(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="form-input"
        placeholder="Añadir nuevo elemento..."
        value={value} // 👈 Aquí se usa la variable del error
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn-submit">
        {itemToEdit ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default Form;