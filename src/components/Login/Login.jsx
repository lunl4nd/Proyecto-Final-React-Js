import { useState } from 'react';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login =()=> {
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin =(e)=>{
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            console.log("Usuario Logueado: ", user);
            alert("Inicio de sesión exitoso");
            navigate('/');})
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error ("error en el login", errorCode, errorMessage);
            alert("Error: "+ error.message);});
    };
    return (
        <div>
            <h2> Iniciar Sesión</h2>
            <form onSubmit= {handleLogin}>
                <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                <button type="submit"> Ingresar </button>            
            </form>
        </div>
    )
};

export default Login;