import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

//TODO Construir pagina
const Categories = () => {
  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <h1>Aqui ira Categorias</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
