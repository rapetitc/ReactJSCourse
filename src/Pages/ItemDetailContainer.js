import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ImgsPreview from "../Components/ImgsPreview";
import FavoriteButton from "../Components/FavoriteButton";
import RatingCalculator from "../Components/RatingCalculator";
import PaymentMethods from "../Components/PaymentMethods";
import ShippingAddress from "../Components/ShippingAddress";
import CartButtons from "../Components/CartButtons";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [product, setProduct] = useState({});

  const getProducts = async (id) => {
    const results = await getDoc(doc(db, "products", id));

    setLoaded(true);
    setProduct({ ...results.data(), id: results.id });
  };

  useEffect(() => {
    getProducts(id);
  }, [loaded]);

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          {loaded ? (
            <div>
              <div className="flex items-center gap-2 py-2 px-30">
                <p>Categoria: </p>
                <Link
                  to={`/search?c=${product.category}`}
                  className="text-blue-400"
                >
                  {product.category}
                </Link>
              </div>
              <div className="flex justify-evenly">
                <div>
                  <ImgsPreview imgs={product.images} />
                </div>
                <div className="w-[350px] h-min py-2 px-3 rounded bg-gray-100">
                  <p className="ms-1 text-sm text-gray-900/75 hover:text-black hover:underline hover:cursor-pointer">
                    {product.brand}
                  </p>
                  <div className="flex justify-between items-center gap-1 m-1">
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <FavoriteButton isFavotire={false} />
                  </div>
                  <RatingCalculator value={product.rating} />
                  <p className="text-4xl mt-4 ms-2 mb-2">${product.price}</p>
                  <PaymentMethods />
                  <ShippingAddress />
                  <CartButtons product_id={id} stock={product.stock} />
                </div>
              </div>
            </div>
          ) : (
            <div>Cargando</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetailContainer;
