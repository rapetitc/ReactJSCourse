import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getDocs, collection, query, where, Query } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import ItemList from "../Components/ItemList";
import Filter from "../Components/Filter";

const searchParamsToObject = (searchParams) => {
  const obj = {};
  for (const [key, value] of searchParams) {
    obj[key] = value;
  }
  return obj;
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);

  const sp = searchParamsToObject(searchParams);

  const search = async () => {
    try {
      const conditions = Object.entries(sp).reduce((acc, [key, value]) => {
        const conditionMap = {
          p: where(
            "keywords",
            "array-contains-any",
            value.split(" ").map((keyword) => keyword.toLowerCase())
          ),
          d: where("department", "==", value), // Department equal to
          c: where("condition", "==", value), // Condition equal to
          ph: where("price", ">=", value), // Price higher than. Also Min Price
          pl: where("price", "<=", value), // Price lower than. Also Max Price
        };
        if (conditionMap[key]) {
          acc.push(conditionMap[key]);
        }
        return acc;
      }, []);

      const querySnapshot = await getDocs(
        query(collection(db, "products"), ...conditions)
      );

      const d = [];
      const c = [];
      let ph = 1000000000;
      let pl = 0;
      const results = querySnapshot.docs
        .map((doc) => {
          const product = { id: doc.id, ...doc.data() };
          if (!d.includes(product.department)) d.push(product.department);
          if (!c.includes(product.condition)) c.push(product.condition);
          if (product.price < ph) ph = product.price;
          if (product.price > pl) pl = product.price;
          return product;
        })
        .filter(Boolean);

      setFilters({ d, c, ph, pl });
      setProducts(results);
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    search();
  }, [Object.entries(sp).length]);

  return (
    <div className="w-[1280px] mx-auto">
      <div className="p-1 ms-5 my-2">
        <p className="text-sm">
          Busqueda relacionada a:{" "}
          <span className="px-1 italic font-semibold">{sp.p}</span>
        </p>
      </div>
      <div className="flex gap-1 w-full">
        <Filter sp={sp} filters={filters} />
        <div className="w-9/12 p-2 m-1 rounded bg-gray-100">
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
