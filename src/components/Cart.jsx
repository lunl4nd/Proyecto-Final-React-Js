import { useCart } from "../context/CartContext";
const Cart = ()=> {
    const {cart, clearCart, increase, decrease}= useCart();
    const itemImageStyle = { width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px' };
    if(cart.length===0){
        return <div> <h1>El carrito está vacío</h1></div>
    }
    return (
        <div> <h1>Carrito de Compras </h1>
            {cart.map(item=>(<div key= {item.id} className="cart-item">
                <img src= {item.image} alt= {item.name} style= {itemImageStyle}/>
                <h4> {item.name}</h4>
                <p>Precio: ${item.price}</p>
                <div className="cantidad">
                    <button onClick= {() => decrease(item.id)}> - </button>
                    <span>Cantidad: {item.quantity}</span>
                    <button onClick= {() => increase(item.id)}> + </button>
                </div>
                </div>))}

        <button onClick={clearCart}>Vaciar</button>
        </div>
    )

}

export default Cart;
