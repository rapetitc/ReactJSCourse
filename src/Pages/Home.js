import ItemListContainer from "../Components/ItemListContainer";
import Presentation from "../Components/Presentation";

const Home = () => {
  return (
    <div className="w-[1280px] mx-auto">
      <Presentation />
      <ItemListContainer />
    </div>
  );
};

export default Home;
