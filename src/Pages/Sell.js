import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import SessionContext from "../Context/SessionContext";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

//TODO Mejorar UI
const Sell = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const handlingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const product = {
      title: form[0].value,
      brand: form[1].value,
      description: form[2].value,
      category: form[3].value,
      price: parseInt(form[4].value),
      stock: parseInt(form[5].value),
      rating: 0,
      images: [form[6].value],
      publisher: session.user,
      creationdate: new Date(),
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
          <div className="w-max p-3 mx-auto">
            <div className="px-2 py-1 border-b border-gray-400">
              <h4 className="ps-1 text-xl">Agrega un producto</h4>
            </div>
            <form
              className="grid grid-cols-6 flex-col gap-2 w-[700px] p-3"
              onSubmit={(e) => {
                handlingSubmit(e);
              }}
            >
              <p className="col-span-2 py-1 text-lg text-end">
                Titulo del producto:
              </p>
              <input
                type="text"
                className="w-full px-3 py-2 border-b outline-none col-span-4"
                name="title"
                id="title"
                pattern="[\w\s]{3,}"
                placeholder="Zapatos Air Jordans, Talla 10 US"
                required
              />

              <p className="col-span-2 py-1 text-lg text-end">
                Marca del producto:
              </p>
              <input
                type="text"
                className="w-full px-3 py-2 border-b outline-none col-span-4"
                pattern="[\w\s]{3,}"
                placeholder="Nike, Adidas, Jordan, etc."
                required
              />

              <p className="col-span-2 py-1 text-lg text-end">
                Description del producto:
              </p>
              <textarea
                className="w-full px-3 py-2 border-b outline-none col-span-4"
                placeholder="Describe las caracteristicas tu producto a detalle, asi tu comprador estara al tanto de ello!. (Max 300 letras)"
                cols="30"
                rows="2"
                minLength="10"
                maxLength="300"
              ></textarea>

              <p className="col-span-2 py-1 text-lg text-end">
                Selecciona la categoria del producto:
              </p>
              <select
                className="w-full px-3 py-2 border-b outline-none col-span-4"
                defaultValue={"Selecciona la categoria"}
                required
              >
                <option disabled>Selecciona la categoria</option>
                <option>Ropa para hombre</option>
                <option>Ropa para mujeres</option>
                <option>Ropa para niños</option>
                <option>Ropa para niñas</option>
                <option>Tecnologia</option>
                <option>Decoracion para la casa</option>
                <option>Fragancias</option>
                <option>Comida</option>
              </select>

              <p className="col-span-2 py-1 text-lg text-end">
                Precio del producto:
              </p>
              <input
                type="text"
                className="w-full px-3 py-2 border-b outline-none col-span-4"
                pattern="[0-9]+"
                placeholder="Precio: $500"
                required
              />

              <p className="col-span-2 py-1 text-lg text-end">
                Disponibilidad del producto:
              </p>
              <input
                type="text"
                className="w-full px-3 py-2 border-b outline-none col-span-4"
                pattern="[0-9]+"
                placeholder="Disponibilidad: 100"
                required
              />

              <p className="col-span-2 py-1 text-lg text-end">
                Imagenes del producto:
              </p>
              <input
                type="text"
                className="w-full px-3 py-2 border-b outline-none col-span-4"
                pattern="https?:\/\/[a-z0-9\.-  ]+\.[a-z0-9]{2,3}\/.+"
                placeholder="Enlace de las imagenes, (Separa cada url con una coma ',' )."
                required
              />
              <button
                type="submit"
                className="col-start-2 col-span-4 w-full px-3 py-2 bg-blue-400 rounded cursor-pointer"
              >
                Publicar Producto
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sell;
