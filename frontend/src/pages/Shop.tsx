import Hero from "../components/Hero";
import NewCollections from "../components/NewCollections";
import NewsLetter from "../components/NewsLetter";
import Offers from "../components/Offers";
import Popular from "../components/Popular";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;
