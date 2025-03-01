import { useState, useEffect, useContext } from "react";
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
import SessionContext from "../Context/SessionContext";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { session } = useContext(SessionContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState({});
  const [isProductOwner, setIsProductOwner] = useState(false);

  const getProducts = async (id) => {
    const results = await getDoc(doc(db, "products", id));

    if (session != null)
      setIsProductOwner(session?.user.id == product.publisher);

    setIsLoaded(true);
    setProduct({ ...results.data(), id: results.id });
  };

  useEffect(() => {
    getProducts(id);
  }, [isLoaded]);

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          {isLoaded ? (
            <div>
              {isProductOwner ? (
                <div className="flex items-center gap-3 p-3 my-3 mx-5 text-white rounded bg-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="size-6"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                  </svg>
                  <p className="text-lg font-semibold">
                    Estas viendo una vista previa de tu producto
                  </p>
                </div>
              ) : null}
              <div className="flex items-center gap-2 py-2 px-30">
                <p>Categoria: </p>
                <Link
                  to={`/search?d=${product.department}`}
                  className="text-blue-400"
                >
                  {product.department}
                </Link>
              </div>
              <div className="flex justify-evenly">
                <div>
                  <ImgsPreview imgs={product.images} />
                </div>
                <div className="flex flex-col w-[350px] h-min py-2 px-3 rounded bg-gray-100">
                  <p className="ms-1 text-sm text-gray-900/75 hover:text-black hover:underline hover:cursor-pointer">
                    {product.brand}
                  </p>
                  <div className="flex justify-between items-center gap-1 m-1">
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <FavoriteButton product_id={id} disabled={isProductOwner} />
                  </div>
                  <RatingCalculator value={product.rating} />
                  <p className="text-4xl ms-2 my-4">${product.price}</p>
                  <PaymentMethods />
                  <ShippingAddress />
                  <CartButtons
                    product_id={id}
                    stock={product.stock}
                    disabled={isProductOwner}
                  />
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
