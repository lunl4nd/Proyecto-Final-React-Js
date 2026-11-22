import React, {useState, useContext, createContext} from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context){
        throw new Error ('useCart tiene que estar dentro del Provider');
    }
    return context;
}

export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    const addToCart = (product, quantity) =>{
        const ItemInCart = cart.find(item=>item.id === product.id);
        if(ItemInCart){
            const updatedCart = cart.map(item=> item.id === product.id?
                {...item, quantity: item.quantity + quantity}:item
            );
            setCart (updatedCart);
        }else{
            setCart(prevCart => [...prevCart, {...product, quantity}]);
        }
    };

    const removeItem = (productId)=>{
        const updatedCart = cart.filter(item=>item.id!==productId);
        setCart(updatedCart);};
    
    const isInCart = (productId) => {
        return cart.some(item=>item.id===product.id);
    };
    const increase = (productId) => {
    setCart(prevCart => prevCart.map(item =>
        item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
    ));
};

    const decrease = (productId) => {
        setCart(prevCart => prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                : item
        ));
    };
    const clearCart=() => {
        setCart([]);
    };

    const getCartQuantity = () =>{
        return cart.reduce((acc, item)=> acc+item.quantity, 0);
    };

    const getCartTotal= () => {
        return cart.reduce((acc, item)=> acc+item.price*item.quantity, 0);
    };

    const getCurrentQuantity = (productId) =>{
        const item = cart.find(item => item.id===productId);
        return item ? item.quantity : 0;
    }
    return (<CartContext.Provider value={{cart, addToCart, clearCart, getCartQuantity, getCartTotal, getCurrentQuantity, decrease, increase, removeItem, isInCart}}>
        {children}
    </CartContext.Provider>);
};