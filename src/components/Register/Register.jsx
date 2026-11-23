import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try{
            await signup(email, password);
            navigate('/')
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                const wantsToLogin = window.confirm('El correo ya está en uso. ¿Desea iniciar sesión en su lugar?');
                if(wantsToLogin){
                    navigate('/login');
                }
                else{navigate('/');}
            }else{
                setError("Ocurrió un error al registrar el usuario. Por favor, inténtelo de nuevo.");
                console.error("error en el registro:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };
            return (
                <div>
                    <h2>Crear nueva cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Correo electrónico:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p role="alert">{error}</p>}
                    <button type="submit" aria-label="Crear cuenta" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Creando cuenta...
                            </>
                        ) : "Registrarse"}
                    </button>
                </form>
            </div>
            )};
            export default Register;