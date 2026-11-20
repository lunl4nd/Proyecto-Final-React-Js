import React from 'react';
export function FormProduct (dataForm, handleChange, handleSend){
     const formStyle = {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '2rem 1rem',
  };

  return (
    <form style ={formStyle} onSubmit = {handleSend}>
        <h3> Agregar Nuevo Producto</h3>
        <div>
            <label> Nombre del Producto: </label>
            <input type ="text" placeholder='Ej = Gachiakuta 3' onChange={handleChange}/>
        </div>
        <div>
            <label> Precio: </label>
            <input type="number" placeholder='12500' onChange={handleChange}/>
        </div>
        <div>
            <label>Imagen: </label>
            <input type="file" placeholder="Gachiakuta-3.png" onChange={handleChange}/>
        </div>
        <button type="submit">Guardar Producto</button>
    </form> 
  )
}