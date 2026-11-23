import {createContext, useState, useEffect, useContext} from 'react';
import {getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, doc, getDoc} from "firebase/firestore";

export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth tiene que ser usado dentro de un AuthProvider");
    return context;
}
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);
    const auth = getAuth();
    const db = getFirestore();
    const signup = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);}
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);}
    const logout = () =>{
        return signOut(auth);}
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async (currentUser)=>{
            setAuthError(null);
            if(currentUser){
                try {
                    const userDocRef = doc(db, "Usuarios", currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    const rol = userDocSnap.exists() && userDocSnap.data().rol === "admin"
                        ? "admin"
                        : "user";
                    setUser({...currentUser, rol});
                } catch (error) {
                    console.error("Error al verificar el rol del usuario:", error);
                    setUser({...currentUser, rol: "user"});
                    setAuthError("No se pudo verificar tu rol en Firestore.");
                }
            }else{
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();},[auth, db]);

    const value = {user, loading, authError, signup, login, logout};
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
    }