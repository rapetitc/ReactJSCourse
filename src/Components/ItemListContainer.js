import { useEffect, useState } from "react";
import { getDocs, collection, query, limit } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getProducts = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "products"), limit(30))
    );

    let products = [];
    querySnapshot.docs.forEach((element) => {
      products.push({ id: element.id, ...element.data() });
    });

    setIsLoaded(true);
    setData(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="px-3 py-1 my-5 bg-gray-100 rounded-lg">
      <h3 className="ms-7 my-5 text-2xl font-medium">
        Porque puede que te interese
      </h3>
      {isLoaded ? (
        data.length > 0 ? (
          <div className="flex gap-3 my-2">
            {data.map((product, index) => {
              return <ItemList product={product} key={index} />;
            })}
          </div>
        ) : (
          "Sin productos para cargar"
        )
      ) : (
        <div className="flex gap-3 my-2">
          <div className="w-50 bg-white">
            <div className="size-50"></div>
            <div className="w-full py-1 px-3">
              <h5 className="my-1 text-sm line-clamp-2">Cargando . . .</h5>
              <p className="h-[28px] text-lg text-green-500 font-semibold">
                Cargando . . .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
