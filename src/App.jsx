import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import ItemDetailContainer from './components/Products/ItemDetailContainer/ItemDetailContainer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductosDestacados from './pages/ProductosDestacados';
import Cart from './components/Cart/Cart';
import Gestion from './components/Gestion/Gestion';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productos />} />
        <Route path= "/destacados" element = {<ProductosDestacados />}/>
        <Route path="/gestion" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Gestion/>
          </ProtectedRoute>
        } />
        <Route path= "/product/:id" element= {<ItemDetailContainer/>}/>
        <Route path= "/carrito" element= {<Cart/>}/>
        <Route path= "/login" element= {<Login/>}/>
        <Route path= "/register" element= {<Register/>}/>
        <Route path="/alta" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Gestion/>
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
    </SearchProvider>
  );
}

export default App;