import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// TODO Evaluar mas tarde agregar el uso del filtro Departamento
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const p = searchParams.get("p"); // Producto
  const [searchFor, setSearchFor] = useState("");

  const handingOnChange = (e) => {
    const { value } = e.target;
    const isValidFormat = /^[a-zA-Z0-9\s]*$/.test(value);
    if (value.length > 0) {
      if (isValidFormat) setSearchFor(value);
    } else setSearchFor("");
  };

  const handingReset = (e) => {
    e.preventDefault();
    setSearchFor("");
  };

  const handlingSubmit = (e) => {
    e.preventDefault();
    const search = searchFor.trim();
    setSearchFor(search);
    if (search.length > 2) navigate(`/search?p=${search}`);
  };
  useEffect(() => {
    setSearchFor(p || "");
  }, [p]);

  return (
    <div className="w-full">
      <form
        onSubmit={handlingSubmit}
        className="flex content-center gap-1 w-full py-2 px-3 my-2 rounded bg-white overflow-hidden"
      >
        <input
          type="text"
          className="w-[calc(100%-24px)] outline-none"
          value={searchFor}
          pattern="[a-zA-Z0-9\s]{3,}"
          onChange={handingOnChange}
          required
          placeholder="Buscar productos, marcas y mas..."
        />
        {searchFor.length > 0 ? (
          <button
            type="button"
            className="mx-2 cursor-pointer"
            onClick={handingReset}
          >
            <svg fill="currentColor" className="size-3" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        ) : null}
        <button type="submit" className="cursor-pointer">
          <svg fill="currentColor" className="size-6" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
