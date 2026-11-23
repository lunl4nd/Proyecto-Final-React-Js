import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login =()=> {
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (loginError) {
            console.error("Error en el login:", loginError);
            setError("No se pudo iniciar sesión. Revisá el correo y la contraseña.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.login}>
            <h2>Iniciar Sesión</h2>
            <form className={styles.form} onSubmit= {handleLogin}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
                {error && <p role="alert">{error}</p>}
                <button type="submit" aria-label="Iniciar sesión" disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Ingresando...
                        </>
                    ) : "Ingresar"}
                </button>
            </form>
        </div>
    )
};

export default Login;