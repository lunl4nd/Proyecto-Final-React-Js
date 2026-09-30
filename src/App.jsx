import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

const Home = () => <h1>La Luna de Papel</h1>;
const Cart = () => <h1>Carrito de Compras</h1>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<ItemListContainer />} />
        <Route path="producto/:id" element={<ItemDetailContainer />} />
        <Route path="carrito" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;