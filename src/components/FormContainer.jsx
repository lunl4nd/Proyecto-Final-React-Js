import React, {useState} from 'react';
import { FormProduct } from '../pages/FormProduct';

export function FormContainer(){
    const [dataForm, setDataForm]= useState({
        name:"",
        price: "",
        stock: "",
        urlImage: ""
    });

    const handleChange = (event)=> {
        const {name, value} = event.target;
        setDataForm({
            ...dataForm, [name]:value
        });
    };
    const handleSend= (event)=>{
        event.preventDefault();
        console.log('Enviando a la API:', dataForm);
    };

    return(
        <FormProduct
            dataForm={dataForm}
            handleChange={handleChange}
            handleSend={handleSend}/>
    );

}