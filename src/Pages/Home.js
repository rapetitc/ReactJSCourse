import NavBar from "../Components/Navbar";
import ItemListContainer from "../Components/ItemListContainer";
import Presentation from "../Components/Presentation";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <Presentation />
          <ItemListContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
