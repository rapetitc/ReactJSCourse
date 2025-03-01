import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import ItemList from "../Components/ItemList";

// TODO IMPORTANTE !! Realizar Filtro UI
const Search = () => {
  const [searchParams] = useSearchParams();
  const p = searchParams.get("p"); // Producto
  const d = searchParams.get("d"); // Departamento
  const [products, setProducts] = useState([]);

  // TODO Habilitar hacer busqueda con filtros
  const searchProduct = async () => {
    const products = [];

    if (p != null)
      for (const keyword of p.split(" ")) {
        const results = await getDocs(
          query(
            collection(db, "products"),
            where("keywords", "array-contains", keyword.toLowerCase())
          )
        );

        if (!results.empty)
          results.docs.forEach((doc) => {
            const product = { id: doc.id, ...doc.data() };
            if (!products.find((prod) => prod.id == product.id))
              products.push(product);
          });
      }

    setProducts(products);
  };

  useEffect(() => {
    searchProduct();
  }, [p]);

  return (
    <div className="w-[1280px] mx-auto">
      <div className="p-1 ms-5 my-2">
        <p>
          Producto relacionados a:{" "}
          <span className="px-1 italic font-semibold">{p}</span>
        </p>
      </div>
      <div className="flex gap-1 w-full">
        <div className="w-3/12 p-1 m-1 rounded bg-gray-100"></div>
        <div className="w-9/12 p-1 m-1 rounded bg-gray-100">
          <div className="flex flex-wrap gap-3">
            {products.length > 0
              ? products.map((product, i) => (
                  <ItemList product={product} key={i} />
                ))
              : "No se encontraron productos"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
