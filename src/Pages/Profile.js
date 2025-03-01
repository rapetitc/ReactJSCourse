import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import SessionContext from "../Context/SessionContext";

const PublishedProducts = () => {
  const { session } = useContext(SessionContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const getPublishedProducts = async () => {
    const results = await getDocs(
      query(
        collection(db, "products"),
        where("publisher", "==", session.user.id)
      )
    );
    const products = [];
    if (!results.empty) {
      results.docs.forEach((product) => {
        products.push({ id: product.id, ...product.data() });
      });
    }
    setIsLoaded(true);
    setData(products);
  };

  useEffect(() => {
    getPublishedProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full bg-gray-200 p-2 rounded">
      <div className="py-2">
        <h4 className="text-xl text-center text-gray-800 font-semibold">
          Productos publicados
        </h4>
      </div>
      {isLoaded ? (
        data.length == 0 ? (
          <div className="flex justify-center p-1">
            <p>Sin productos publicados</p>
          </div>
        ) : (
          <table className="w-full rounded-lg bg-white overflow-hidden">
            <thead>
              <tr>
                <td className="ps-15 p-2 font-semibold">Producto</td>
                <td className="p-2 text-center font-semibold">Precio</td>
              </tr>
            </thead>
            <tbody>
              {data.map((data, i) => {
                return (
                  <tr
                    className={i % 2 == 0 ? "bg-yellow-100" : "bg-yellow-200"}
                    key={i}
                  >
                    <td>
                      <Link
                        to={`/product/${data.id}`}
                        className="flex items-center gap-3 p-1 text-lg font-semibold"
                      >
                        <div className="flex justify-center items-center size-10 rounded bg-white  overflow-hidden">
                          <img
                            src={data.images[0]}
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <p>{data.title}</p>
                      </Link>
                    </td>
                    <td className="text-center">${data.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      ) : (
        <p className="text-center">Cargando. . . </p>
      )}
    </div>
  );
};

const Purchases = () => {
  const { session } = useContext(SessionContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const getPublishedProducts = async () => {
    const results = await getDocs(
      query(collection(db, "tickets"), where("buyer", "==", session.user.id))
    );

    const purchases = [];
    if (!results.empty) {
      results.docs.forEach((purchase) => {
        purchases.push({ id: purchase.id, ...purchase.data() });
      });
    }
    setIsLoaded(true);
    setData(purchases);
  };

  useEffect(() => {
    getPublishedProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full bg-gray-200 p-2 rounded">
      <div className="py-2">
        <h4 className="text-xl text-center text-gray-800 font-semibold">
          Mis compras
        </h4>
      </div>
      {isLoaded ? (
        data.length == 0 ? (
          <div className="flex justify-center p-1">
            <p>Sin compras</p>
          </div>
        ) : (
          <table className="w-full rounded-lg bg-white overflow-hidden">
            <thead>
              <tr>
                <td className="ps-15 p-2 font-semibold">Compras</td>
                <td className="p-2 text-center font-semibold">Total pagado</td>
              </tr>
            </thead>
            <tbody>
              {data.map((doc, i) => {
                return (
                  <tr
                    className={i % 2 == 0 ? "bg-yellow-100" : "bg-yellow-200"}
                    key={i}
                  >
                    <td className="p-1">
                      <Link to={`/ticket/${doc.id}`}>{doc.id}</Link>
                    </td>
                    <td className="p-1 text-center">${doc.total_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      ) : (
        <p className="text-center">Cargando. . . </p>
      )}
    </div>
  );
};

const Profile = () => {
  return (
    <div className="w-[1280px] mx-auto">
      <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
        <h3 className="text-2xl">Tu perfil</h3>
      </div>
      <div className="flex gap-5 w-full p-5">
        <PublishedProducts />
        <Purchases />
      </div>
    </div>
  );
};

export default Profile;
