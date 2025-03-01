import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import { titleCase } from "../utils/string_methods";
import SessionContext from "../Context/SessionContext";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import moment from "moment";

const Sell = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const handlingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form[0].value;
    const product = {
      title: titleCase(title),
      brand: form[1].value,
      description: form[2].value,
      department: form[3].value,
      price: parseInt(form[4].value),
      stock: parseInt(form[5].value),
      rating: 0,
      images: [form[6].value],
      publisher: session.user.id,
      keywords: title.toLowerCase().split(" "),
      creationdate: moment().format(),
      status: "active",
    };

    try {
      const { id } = await addDoc(collection(db, "products"), product);
      navigate(`/product/${id}`);
    } catch (error) {
      console.error("Error al crear product", error);
    }
  };

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
            <h3 className="text-2xl">Vender</h3>
          </div>
          <div className="p-5 m-5">
            <div className="px-2 py-1 border-b border-gray-400">
              <h4 className="ps-1 text-xl">
                Agrega los detalles de tu producto
              </h4>
            </div>
            <form
              className="p-6"
              onSubmit={(e) => {
                handlingSubmit(e);
              }}
            >
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col col-span-2">
                  <p className="py-1 text-lg">Titulo del producto:</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    name="title"
                    id="title"
                    pattern="[\w\s]{3,}"
                    placeholder="Zapatos Air Jordans, Talla 10 US"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="py-1 text-lg">Marca:</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    pattern="[\w\s]{3,}"
                    placeholder="Nike, Adidas, Jordan, etc."
                    required
                  />
                </div>
                <div className="flex flex-col col-span-3">
                  <p className="py-1 text-lg">Description:</p>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Describe las caracteristicas tu producto a detalle, asi tu comprador estara al tanto de ello!. (Max 300 letras)"
                    cols="30"
                    rows="2"
                    minLength="10"
                    maxLength="300"
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <p className="py-1 text-lg">Categoria del producto:</p>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    defaultValue={"Selecciona la categoria"}
                    required
                  >
                    <option disabled>Selecciona la categoria</option>
                    <option>Ropa</option>
                    <option>Tecnologia</option>
                    <option>Hogar</option>
                  </select>
                </div>
                {/* <div className="flex gap-6 col-span-3"> */}
                <div className="flex flex-col w-full">
                  <p className="py-1 text-lg">Precio:</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    pattern="[0-9]+"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="py-1 text-lg">Disponibilidad:</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    pattern="[0-9]+"
                    required
                  />
                </div>
                {/* </div> */}
                <div className="flex flex-col col-span-2">
                  <p className="py-1 text-lg">Imagenes del producto:</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    pattern="https?:\/\/[a-z0-9\.-  ]+\.[a-z0-9]{2,3}\/.+"
                    placeholder="Separa cada url con un punto y coma mas un espacio '; ' )."
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center w-full mt-10">
                <button
                  type="submit"
                  className="w-1/2 px-3 py-3 text-lg text-white bg-blue-400 rounded cursor-pointer"
                >
                  Publicar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sell;
