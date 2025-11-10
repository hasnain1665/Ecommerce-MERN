import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import men_banner from "./assets/banner_mens.png";
import women_banner from "./assets/banner_women.png";
import kids_banner from "./assets/banner_kids.png";
import { Toaster } from "react-hot-toast";
import Main from "./components/Layout/Main";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { fetchAllProducts } from "./redux/productSlice";
import { useEffect } from "react";
import { fetchAllCategories } from "./redux/categorySlice";
import AdminPanel from "./components/Layout/AdminPanel";
import AddProduct from "./components/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import ListProducts from "./components/ListProducts";
import AddCategory from "./components/AddCategory";
import ListCategories from "./components/ListCategories";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<Shop />} />
            <Route
              path="/men"
              element={<ShopCategory itemCategory="men" banner={men_banner} />}
            />
            <Route
              path="/women"
              element={
                <ShopCategory itemCategory="women" banner={women_banner} />
              }
            />
            <Route
              path="/kids"
              element={
                <ShopCategory itemCategory="kids" banner={kids_banner} />
              }
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="listproducts" element={<ListProducts />} />
            <Route path="listcategories" element={<ListCategories />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
