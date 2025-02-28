import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSearchParams } from "react-router-dom";

//TODO Construir pagina
const Search = () => {
  const [searchParams] = useSearchParams();
  const p = searchParams.get("p"); // Producto
  const c = searchParams.get("c"); // Categoria

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <p>Buscando: {p}</p>
          <p>Categoria: {c}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
