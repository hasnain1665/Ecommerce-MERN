import Hero from "../components/Hero";
import NewCollections from "../components/NewCollections";
import Offers from "../components/Offers";
import Popular from "../components/Popular";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
    </div>
  );
};

export default Shop;
