import styled, { css } from 'styled-components';

const actionButtonStyles = css`
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #1e293b;
  color: #1e293b;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1e293b;
    color: #ffffff;
  }
`;

const ChooseImageButton = styled.label`
  ${actionButtonStyles}
  display: inline-flex;
  align-items: center;

  &:focus-within {
    outline: 2px solid #1e293b;
    outline-offset: 2px;
  }
`;

const HiddenFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SelectedFileName = styled.span`
  margin-left: 10px;
  overflow-wrap: anywhere;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  width: 100%;
  margin-bottom: 16px;
`;

const SaveButton = styled.button`
  ${actionButtonStyles}
`;

export function FormProduct ({ dataForm, handleChange, handleImageChange, handleSend, imagePreview, imageFileName, modoEdicion = false, saving = false }){
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
        <FormField>
            <label> Nombre del Producto: </label>
            <input type ="text" name="name" value={dataForm.name ?? ''} placeholder='Ej = Gachiakuta 3' onChange={handleChange} required/>
        </FormField>
        <FormField>
            <label> Precio: </label>
            <input type ="number" name="price" value={dataForm.price ?? ''} placeholder='12500' onChange={handleChange} required min="1"/>
        </FormField>
        <FormField>
            <label> Stock: </label>
            <input type ="number" name="stock" value={dataForm.stock ?? ''} placeholder='10' onChange={handleChange} min="0" required/>
        </FormField>
        <FormField>
            <label>Imagen:</label>
            <div>
                <ChooseImageButton>
                    Elegir imagen
                    <HiddenFileInput type="file" name="image" accept="image/*" onChange={handleImageChange}/>
                </ChooseImageButton>
                {imageFileName && <SelectedFileName>{imageFileName}</SelectedFileName>}
            </div>
            {(imagePreview || (modoEdicion && dataForm.image)) && (
                <div>
                    <p>{imagePreview ? "Vista previa:" : "Imagen actual:"}</p>
                    <img src={imagePreview || dataForm.image} alt="Vista previa" style={{width:'100px'}}/>
                </div>
            )}
        </FormField>
        <SaveButton type="submit" disabled={saving}>
            {saving ? 'Guardando...' : (modoEdicion ? 'Actualizar producto' : 'Guardar producto')}
        </SaveButton>
    </form>
  )
}
