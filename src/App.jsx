import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductosDestacados from './pages/ProductosDestacados';
import Cart from './components/Cart/Cart';
import Gestion from './components/Gestion/Gestion';

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productos />} />
        <Route path= "/destacados" element = {<ProductosDestacados />}/>
        <Route path= "/alta" element= {<Gestion/>}/>
        <Route path= "/gestion" element= {<Gestion/>}/>
        <Route path= "/product/:id" element= {<ItemDetailContainer/>}/>
        <Route path= "/carrito" element= {<Cart/>}/>
      </Route>
    </Routes>
  );
}

export default App;