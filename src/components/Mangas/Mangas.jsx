import React,{useState, useEffect} from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const Mangas = () =>{
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const productsDB = collection(db, "Mangas")
        getDocs(productsDB).then((resp)=>{
           setProducts(
            resp.docs.map((doc)=>{
                return{...doc.data(), id: doc.id}
            })
           ); 
        })
    }, []);
    return (
        <div>
             <h1>Mangas</h1>
             <div className="list-products">
                {products.map(prod=>(
                    <div key={prod.id}>
                        <img src={prod.image} alt={prod.name}/>
                        <h3>{prod.name}</h3>
                        <p>Precio: {prod.price}</p>
                        <p>Stock: {prod.stock} unidades</p>
                        <hr/>
                    </div>
                ))}
             </div>
        </div>
       
    );
};