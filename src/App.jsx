import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { FormContainer } from './components/FormContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductosDestacados from './pages/ProductosDestacados';
import Cart from './components/Cart';

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productos />} />
        <Route path= "/destacados" element = {<ProductosDestacados />}/>
        <Route path= "/alta" element= {<FormContainer/>}/>
        <Route path= "/product/:id" element= {<ItemDetailContainer/>}/>
        <Route path= "/carrito" element= {<Cart/>}/>
      </Route>
    </Routes>
  );
}

export default App;