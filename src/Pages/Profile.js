import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import SessionContext from "../Context/SessionContext";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PublishedProducts = () => {
  const { session } = useContext(SessionContext);
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
    setData(products);
  };

  useEffect(() => {
    getPublishedProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between py-1 px-2">
        <h4 className="text-lg font-semibold">Productos publicados</h4>
        <Link to={"/sell"} className="px-1 hover:underline">
          Vender
        </Link>
      </div>
      {data.length == 0 ? (
        <div>Sin productos publicados</div>
      ) : (
        <table className="w-full bg-white">
          <thead className="">
            <tr>
              <td className="p-1 font-semibold">Producto</td>
              <td className="p-1 font-semibold">Precio</td>
            </tr>
          </thead>
          <tbody className="">
            {data.map((data, i) => {
              return (
                <tr className="bg-red-100" key={i}>
                  <td className="p-1 ">
                    <Link>{data.title}</Link>
                  </td>
                  <td className="p-1 ">${data.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const Purchases = () => {
  const { session } = useContext(SessionContext);
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
    setData(purchases);
  };

  useEffect(() => {
    getPublishedProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between py-1 px-2">
        <h4 className="text-lg font-semibold">Mis compras</h4>
      </div>
      {data.length == 0 ? (
        <div>Sin compras realizadas</div>
      ) : (
        <table className="w-full bg-white">
          <thead className="">
            <tr>
              <td className="p-1 font-semibold">Ticket</td>
              <td className="p-1 font-semibold">Total pagado</td>
            </tr>
          </thead>
          <tbody className="">
            <tr className="bg-red-100">
              <td className="p-1 ">
                <Link>GYSGW459GTG912GOLAS25FU</Link>
              </td>
              <td className="p-1 ">$150</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

//TODO Mejorar UI de Mis Compras y Productos Publicados
const Profile = () => {
  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
            <h3 className="text-2xl">Tu perfil</h3>
          </div>
          <div className="flex w-full p-5">
            <div className="w-full p-4">
              <PublishedProducts />
            </div>
            <div className="w-full p-4">
              <Purchases />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
