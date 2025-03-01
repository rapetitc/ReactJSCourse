import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";

import { db } from "../utils/firebase_config";
import SessionContext from "../Context/SessionContext";
import Input from "../Components/Input";

const Sell = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const handlingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form[0].value;
    const product = {
      title: title,
      brand: form[1].value,
      description: form[2].value,
      department: form[3].value,
      price: parseInt(form[4].value),
      stock: parseInt(form[5].value),
      rating: 0,
      images: form[6].value.split("; "),
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
    <div className="w-[1280px] mx-auto">
      <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
        <h3 className="text-2xl">Vender</h3>
      </div>
      <div className="flex flex-col gap-3 p-4 bg-yellow-200 rounded">
        <div className="ps-8 py-3">
          <h4 className="text-xl">Agrega los detalles de tu producto</h4>
        </div>
        <form
          className="p-6 bg-white rounded"
          onSubmit={(e) => {
            handlingSubmit(e);
          }}
        >
          <div className="grid grid-cols-3 gap-6">
            <div className="flex gap-5 col-span-3">
              <Input
                type="text"
                label="Titulo del producto"
                id="title"
                placeholder="Zapatos Air Jordans, Talla 10 US"
                pattern="[\w\s]{3,}"
                required
              />
              <Input
                type="text"
                label="Marca del producto"
                id="brand"
                placeholder="Nike, Adidas, Jordan, etc."
                pattern="[\w\s]{3,}"
                required
              />
            </div>
            <Input
              type="textarea"
              label="Descipcion"
              className="col-span-3"
              id="description"
              placeholder="Nike, Adidas, Jordan, etc."
              pattern="[\w\s]{3,}"
              required
            />
            <Input
              type="select"
              label="Departamento"
              id="department"
              options={["Ropa", "Tecnologia", "Hogar", "Moto", "Carro"]}
              pattern="[\w\s]{3,}"
              required
            />
            <Input
              type="text"
              label="Precio"
              id="price"
              pattern="[0-9]+"
              required
            />
            <Input
              type="text"
              label="Disponibilidad"
              id="stock"
              pattern="[0-9]+"
              required
            />
            <Input
              type="text"
              label="Imagenes del producto"
              className="col-span-3"
              id="images"
              placeholder="Adjunta los enlaces y separalos con un punto y coma mas un espacio '; '"
              pattern="https?:\/\/[a-z0-9\.-  ]+\.[a-z0-9]{2,3}\/.+"
              required
            />
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
  );
};

export default Sell;
