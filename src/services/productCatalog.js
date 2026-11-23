import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const PRODUCTS_COLLECTION = "Mangas";

const getStaticProducts = async () => {
  const response = await fetch("/productos.json");
  if (!response.ok) {
    throw new Error("No se pudo cargar el catálogo estático.");
  }
  return response.json();
};

export const getProducts = async () => {
  const [staticProducts, firestoreProducts] = await Promise.all([
    getStaticProducts(),
    getDocs(collection(db, PRODUCTS_COLLECTION))
  ]);
  const firestoreItems = firestoreProducts.docs.map((productDoc) => ({
    ...productDoc.data(),
    id: productDoc.id
  }));
  const firestoreNames = new Set(
    firestoreItems.map((product) => product.name?.trim().toLocaleLowerCase())
  );
  const unlistedStaticProducts = staticProducts.filter(
    (product) => !firestoreNames.has(product.name?.trim().toLocaleLowerCase())
  );

  return [...unlistedStaticProducts, ...firestoreItems];
};

export const getProductById = async (id) => {
  const productDoc = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
  if (productDoc.exists()) {
    return { ...productDoc.data(), id: productDoc.id };
  }

  const staticProducts = await getStaticProducts();
  return staticProducts.find((product) => String(product.id) === id) ?? null;
};
