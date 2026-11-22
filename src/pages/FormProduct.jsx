import React from 'react';

export function FormProduct ({ dataForm, handleChange, handleImageChange, handleSend, modoEdicion = false }){
     const formStyle = {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '2rem 1rem',
  };

  return (
    <form style ={formStyle} onSubmit = {handleSend}>
        <h3>{modoEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h3>
        <div>
            <label> Nombre del Producto: </label>
            <input type ="text" name="name" value={dataForm.name ?? ''} placeholder='Ej = Gachiakuta 3' onChange={handleChange} required/>
        </div>
        <div>
            <label> Precio: </label>
            <input type ="number" name="price" value={dataForm.price ?? ''} placeholder='12500' onChange={handleChange} required min="1"/>
        </div>
        <div>
            <label> Stock: </label>
            <input type ="number" name="stock" value={dataForm.stock ?? ''} placeholder='10' onChange={handleChange} min="0"/>
        </div>
        <div>
            <label>Imagen:</label>
            <input type="file" name="image" onChange={handleImageChange}/>
            {modoEdicion && dataForm.image && (
                <div>
                    <p>Imagen actual:</p>
                    <img src={dataForm.image} alt="Vista previa" style={{width:'100px'}}/>
                </div>
            )}
        </div>
        <button type="submit">{modoEdicion ? 'Actualizar producto' : 'Guardar producto'}</button>
    </form>
  )
}
