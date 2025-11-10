import { useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchSingleProduct } from "../redux/productSlice";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchSingleProduct({ productId: params.productId }));
  }, [dispatch, params.productId]);

  return (
    <div>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts product={product} />
    </div>
  );
};

export default Product;
