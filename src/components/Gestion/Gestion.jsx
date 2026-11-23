import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase/config";
import { FormProduct } from "../../pages/FormProduct";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY;
const AdminWrapper = styled.main`
  width: min(100% - 2rem, 1200px);
  margin: 0 auto;
  padding: 2rem 0;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
  max-width: 750px;
  border-top: 1px solid rgba(15, 23, 42, 0.15);
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.15);
  color: #0f172a;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
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
    color: #f8fafc;
  }
`;

const CancelButton = styled(ActionButton)`
  margin: 0 0 16px;
`;

const EditButton = styled(ActionButton)`
  border-color: #1e293b;
  color: #1e293b;

  &:hover {
    background-color: #1e293b;
    color: #ffffff;
  }
`;

const DeleteButton = styled(ActionButton)`
  border-color: rgba(159, 18, 57, 0.4);
  color: #9f1239;

  &:hover {
    background-color: #9f1239;
    border-color: #9f1239;
    color: #ffffff;
  }
`;
const estadoInicialForm = {
  name: "",
  price: "",
  stock: "",
  image: "",
};

const Gestion = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [dataForm, setDataForm] = useState(estadoInicialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(() => {
    setLoadingProducts(true);
    setError("");
    const productsRef = collection(db, "Mangas");
    return getDocs(productsRef)
      .then((resp) => {
        setProducts(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((loadError) => {
        console.error("Error al cargar los productos:", loadError);
        setError("No se pudieron cargar los productos.");
        throw loadError;
      })
      .finally(() => {
        setLoadingProducts(false);
      });
  }, []);

  useEffect(() => {
    fetchProducts().catch((error) => {
      console.error("Carga inicial fallida:", error);
    });
  }, [fetchProducts]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setDataForm({ ...product });
    setImageFile(null);
    setImagePreview(null);
  };

  const cancelarEdicion = () => {
    setProductToEdit(null);
    setDataForm(estadoInicialForm);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const { files } = event.target;
    const selectedFile = files[0] || null;
    setImageFile(selectedFile);
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSend = async (event) => {
    event.preventDefault();
    setError("");

    if (
      (dataForm.name ?? "").trim() === "" ||
      Number(dataForm.price) <= 0 ||
      Number(dataForm.stock) < 0 ||
      dataForm.stock === ""
    ) {
      setError("Completá el nombre y usá un precio mayor a cero y un stock válido.");
      return;
    }

    setSaving(true);
    let urlImage = dataForm.image;

    if (imageFile) {
      if (!IMGBB_API_KEY) {
        alert(
          "Falta VITE_IMGBB_KEY. Copiá .env.example a .env y agregá tu API key de ImgBB.",
        );
        return;
      }
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(
            result.error?.message || "La subida de la imagen falló.",
          );
        }
        urlImage = result.data.url;
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setError("No se pudo subir la imagen. Revisá la configuración de ImgBB.");
        setSaving(false);
        return;
      }
    }

    const productoFinal = {
      ...dataForm,
      image: urlImage,
      price: Number(dataForm.price),
      stock: Number(dataForm.stock),
    };
    delete productoFinal.id;

    try {
      if (productToEdit) {
        await updateDoc(doc(db, "Mangas", productToEdit.id), productoFinal);
        alert("Producto actualizado con éxito.");
        setProductToEdit(null);
        setDataForm(estadoInicialForm);
        setImageFile(null);
        setImagePreview(null);
      } else {
        await addDoc(collection(db, "Mangas"), productoFinal);
        alert("Producto guardado con éxito.");
        setDataForm(estadoInicialForm);
        setImageFile(null);
        setImagePreview(null);
      }
      fetchProducts();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setError("No se pudo guardar el producto. Intentá nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "¿Estás seguro de que lo querés eliminar?",
    );
    if (confirmation) {
      setDeletingId(id);
      setError("");
      try {
        await deleteDoc(doc(db, "Mangas", id));
        await fetchProducts();
      } catch (deleteError) {
        console.error("Error al eliminar el producto:", deleteError);
        setError("No se pudo eliminar el producto.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <AdminWrapper>
      <h1>Gestión de productos</h1>
      {error && <p role="alert">{error}</p>}
      {loadingProducts && (
        <div className="d-flex align-items-center gap-2" role="status">
          <Spinner animation="border" size="sm" />
          <span>Cargando productos...</span>
        </div>
      )}
      <FormProduct
        dataForm={dataForm}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSend={handleSend}
        imagePreview={imagePreview}
        imageFileName={imageFile?.name}
        modoEdicion={!!productToEdit}
        saving={saving}
      />
      {productToEdit && (
        <CancelButton type="button" onClick={cancelarEdicion}>
          Cancelar edición
        </CancelButton>
      )}
      <ProductList>
        {products.map((prod) => (
          <ProductItem key={prod.id}>
            <span>
              <strong>{prod.name}</strong> — ${prod.price}
            </span>
            <ButtonGroup>
              <EditButton
                onClick={() => handleEditClick(prod)}
                aria-label={`Editar ${prod.name}`}
              >
                <FaEdit style={{ marginRight: "0.5rem" }} /> Editar
              </EditButton>
              <DeleteButton
                onClick={() => handleDelete(prod.id)}
                aria-label={`Eliminar ${prod.name}`}
                disabled={deletingId === prod.id}
              >
                {deletingId === prod.id ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Eliminando
                  </>
                ) : (
                  <>
                    <FaTrash style={{ marginRight: "0.5rem" }} /> Eliminar
                  </>
                )}
              </DeleteButton>
            </ButtonGroup>
          </ProductItem>
        ))}
      </ProductList>
    </AdminWrapper>
  );
};
export default Gestion;
