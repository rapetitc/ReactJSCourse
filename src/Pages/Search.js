import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getDocs, collection, query, where, Query } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import ItemList from "../Components/ItemList";
import Filter from "../Components/Filter";

const isValidNumber = (value) => !isNaN(Number(value));

const Search = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);

  const search = async () => {
    try {
      const queryConditions = [];

      const queryConditionsMap = {
        p: (value) =>
          where(
            "keywords",
            "array-contains-any",
            value
              .split(" ")
              .map((keyword) => keyword.toLowerCase())
              .filter(Boolean)
          ),
        d: (value) => where("department", "==", value),
        c: (value) => where("condition", "==", value),
        pl: (value) =>
          isValidNumber(value) && where("price", ">=", Number(value)),
        ph: (value) =>
          isValidNumber(value) && where("price", "<=", Number(value)),
      };

      for (const [key, value] of Array.from(searchParams)) {
        if (queryConditionsMap[key]) {
          const condition = queryConditionsMap[key](value);
          if (condition) {
            queryConditions.push(condition);
          }
        }
      }

      console.log(queryConditions);
      
      const querySnapshot = await getDocs(
        query(collection(db, "products"), ...queryConditions)
      );

      const departments = new Set();
      const conditions = new Set();
      let minPrice = Infinity;
      let maxPrice = -Infinity;

      const products = querySnapshot.docs.map((doc) => {
        const product = { id: doc.id, ...doc.data() };

        departments.add(product.department);
        conditions.add(product.condition);
        minPrice = Math.min(minPrice, product.price);
        maxPrice = Math.max(maxPrice, product.price);

        return product;
      });

      setFilters({
        d: Array.from(departments),
        c: Array.from(conditions),
        ph: maxPrice === -Infinity ? 0 : maxPrice,
        pl: minPrice === Infinity ? 0 : minPrice,
      });
      setProducts(products);
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    search();
  }, [searchParams.toString()]);

  return (
    <div className="w-[1280px] mx-auto">
      <div className="p-1 ms-5 my-2">
        {searchParams.get("p") ? (
          <p className="text-sm">
            Busqueda relacionada a:{" "}
            <span className="px-1 italic font-semibold">
              {searchParams.get("p")}
            </span>
          </p>
        ) : null}
      </div>
      <div className="flex gap-1 w-full">
        <Filter searchParams={searchParams} filters={filters} />
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
