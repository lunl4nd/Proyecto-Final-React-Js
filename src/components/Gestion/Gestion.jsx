import React,{useState, useEffect, useCallback} from "react";
import {db} from "../../firebase/config"
import { FormProduct } from "../../pages/FormProduct";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY || '';

const estadoInicialForm = {
    name: "",
    price: "",
    stock: "",
    image: ""
};

const Gestion = ()=>{
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [dataForm, setDataForm] = useState(estadoInicialForm);
    const [imageFile, setImageFile] = useState(null);

    const fetchProducts = useCallback(()=>{
        const productsRef = collection (db, "Mangas");
        return getDocs(productsRef).then((resp)=>{
            setProducts(
                resp.docs.map((doc)=>({...doc.data(), id:doc.id}))
            );
        });
    }, []);

    useEffect(()=>{
        fetchProducts().catch((error)=>{
            console.error('Error al cargar los productos:', error);
        });
    }, [fetchProducts]);

    useEffect(() => {
        if(productToEdit){
            setDataForm({...productToEdit});
        }else{
            setDataForm(estadoInicialForm);
        }
        setImageFile(null);
    }, [productToEdit]);

    const handleEditClick = (product)=>{
        setProductToEdit(product);
    }

    const cancelarEdicion = ()=>{
        setProductToEdit(null);
    }

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setDataForm({
            ...dataForm, [name]: value
        });
    };

    const handleImageChange = (event)=>{
        const {files} = event.target;
        setImageFile(files[0] || null);
    };

    const handleSend = async (event)=>{
        event.preventDefault();

        if((dataForm.name ?? "").trim() === "" || Number(dataForm.price) <= 0){
            alert("Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.");
            return;
        }

        let urlImage = dataForm.image;

        if(imageFile){
            if(!IMGBB_API_KEY){
                alert("Falta la key de imgbb: definí VITE_IMGBB_KEY en el archivo .env");
                return;
            }
            const formData = new FormData();
            formData.append('image', imageFile);
            try{
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if(data.success){
                    urlImage = data.data.url; 
                }else{
                    throw new Error('La subida de la imagen falló.');
                }
            }catch(error){
                console.error('Error al subir la imagen:', error);
                alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
                return;
            }
        }

        const productoFinal = {
            ...dataForm,
            image: urlImage,
            price: Number(dataForm.price),
            stock: Number(dataForm.stock)
        };
        delete productoFinal.id;

        try{
            if(productToEdit){
                await updateDoc(doc(db, "Mangas", productToEdit.id), productoFinal);
                alert("Producto actualizado con éxito.");
                setProductToEdit(null);
            }else{
                await addDoc(collection(db, "Mangas"), productoFinal);
                alert("Producto guardado con éxito.");
                setDataForm(estadoInicialForm);
                setImageFile(null);
            }
            fetchProducts();
        }catch(error){
            console.error('Error al guardar el producto:', error);
        }
    };

    const handleDelete = async (id)=>{
        const confirmation = window.confirm("¿Estás seguro de que lo querés eliminar?");
        if(confirmation){
            await deleteDoc(doc(db, "Mangas", id));
            fetchProducts();
        }
    }

    return (
        <div>
            <h1>Gestión de productos</h1>
            <FormProduct
                dataForm={dataForm}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleSend={handleSend}
                modoEdicion={!!productToEdit}/>
            {productToEdit && (
                <button onClick={cancelarEdicion}>Cancelar edición</button>
            )}
            <ul>
                {products.map((prod)=>(
                    <li key={prod.id}>
                        {prod.name} - ${prod.price}
                        <button onClick={()=>handleEditClick(prod)}>Editar</button>
                        <button onClick={()=>handleDelete(prod.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Gestion
