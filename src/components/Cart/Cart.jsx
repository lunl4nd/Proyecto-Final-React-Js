import styled, { css } from "styled-components";
import { useCart } from "../../context/CartContext";

const CartPage = styled.main`
  width: min(100% - 2rem, 1000px);
  margin: 0 auto;
  padding: 2rem 0;
`;

const CartList = styled.div`
  display: grid;
  gap: 16px;
  margin: 24px 0;
`;

const CartItem = styled.article`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) auto;
  align-items: center;
  gap: 20px;
  padding: 16px;
  border: 1px solid rgba(15, 23, 42, 0.15);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.45);

  @media (max-width: 600px) {
    grid-template-columns: 80px minmax(0, 1fr);
    gap: 12px;
    padding: 12px;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 140px;
  padding: 8px;
  object-fit: contain;
  border-radius: 4px;
  background: #ffffff;

  @media (max-width: 600px) {
    width: 80px;
    height: 100px;
  }
`;

const ItemInfo = styled.div`
  min-width: 0;

  h2 {
    margin: 0 0 8px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
  }
`;

const actionButtonStyles = css`
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: transparent;
  border: 1px solid #1e293b;
  color: #1e293b;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1e293b;
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #1e293b;
    outline-offset: 2px;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  @media (max-width: 600px) {
    grid-column: 2;
  }
`;

const QuantityButton = styled.button`
  ${actionButtonStyles}
  min-width: 34px;
  padding: 5px 10px;
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.2);

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const CartTotal = styled.p`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

const ClearButton = styled.button`
  ${actionButtonStyles}
  border-color: #9f1239;
  color: #9f1239;

  &:hover {
    background: #9f1239;
    border-color: #9f1239;
    color: #ffffff;
  }
`;

const EmptyCart = styled.p`
  margin-top: 24px;
`;

const Cart = () => {
  const { cart, clearCart, increase, decrease, getCartTotal } = useCart();

  return (
    <CartPage>
      <h1>Carrito de compras</h1>
      {cart.length === 0 ? (
        <EmptyCart>El carrito está vacío.</EmptyCart>
      ) : (
        <>
          <CartList>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <h2>{item.name}</h2>
                  <p>Precio: ${item.price}</p>
                  <p>Subtotal: ${item.price * item.quantity}</p>
                </ItemInfo>
                <QuantityControls>
                  <QuantityButton
                    type="button"
                    aria-label={`Disminuir cantidad de ${item.name}`}
                    onClick={() => decrease(item.id)}
                  >
                    −
                  </QuantityButton>
                  <span>Cantidad: {item.quantity}</span>
                  <QuantityButton
                    type="button"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                    onClick={() => increase(item.id)}
                  >
                    +
                  </QuantityButton>
                </QuantityControls>
              </CartItem>
            ))}
          </CartList>
          <CartSummary>
            <CartTotal>Total: ${getCartTotal()}</CartTotal>
            <ClearButton type="button" onClick={clearCart}>
              Vaciar carrito
            </ClearButton>
          </CartSummary>
        </>
      )}
    </CartPage>
  );
};

export default Cart;
