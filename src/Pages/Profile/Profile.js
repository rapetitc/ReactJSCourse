import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../Utilities/Firebase";
import { isArrow, isRemoving, isTab } from "../../Utilities/KeyEvaluator";
import "./Profile.css";

import AuthenticatorContext from "../../Context/Authenticator";

const Profile = () => {
  const { token } = useContext(AuthenticatorContext);

  const handlingSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      tittle: form[0].value,
      brand: form[1].value,
      description: form[2].value,
      category: form[3].value,
      price: parseInt(form[4].value),
      stock: parseInt(form[5].value),
      rating: 0,
      images: [form[6].value],
      publisher: token.username,
      creationdate: serverTimestamp(),
      status: "active",
    };
    addProduct(data).then((productid) => {
      console.log("Se ha publicado con exito tu producto, este es tu Product ID:", productid);
    });
  };

  const addProduct = async (data) => {
    console.log(data);
    const dc = collection(db, "products");
    const docRef = await addDoc(dc, data);
    return docRef.id;
  };

  const handlingTitle = (e) => {
    const key = e.key;
    const length = e.target.value.length;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (length >= 70) {
      e.preventDefault();
    }
  };
  const handlingBrand = (e) => {
    const key = e.key;
    const length = e.target.value.length;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (length >= 50) {
      e.preventDefault();
    }
  };
  const handlingDescription = (e) => {
    const key = e.key;
    const length = e.target.value.length;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (length >= 300) {
      e.preventDefault();
    }
  };
  const handlingCategory = (e) => {
    const target = e.target;
    console.log("Category:", target);
    console.log("Category:", target.value);
  };
  const handlingPrice = (e) => {
    const key = e.key;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (isNaN(key)) {
      e.preventDefault();
    }
  };
  const handlingStock = (e) => {
    const key = e.key;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (isNaN(key)) {
      e.preventDefault();
    }
  };
  const handlingImgs = (e) => {
    const target = e.target;
    console.log("imgs:", target);
  };

  return (
    <div className="Profile_Container container">
      {token === null ? (
        <Navigate to={"/session"} />
      ) : (
        <>
          <div className="profile-show">
            <h3>Dashboard</h3>
            <div className="profile-show-status">
              <h4>Estado</h4>
              <div>
                <p>Contenido de Estado</p>
              </div>
            </div>
            <div className="profile-show-addproduct">
              <h4>Agrega un producto</h4>
              <form onSubmit={handlingSubmit}>
                <label>Titulo:</label>
                <input type="text" placeholder="Titulo" onKeyDown={handlingTitle} required />
                <label>Marca:</label>
                <input type="text" placeholder="Marca" onKeyDown={handlingBrand} />
                <label>Description:</label>
                <textarea placeholder="Description" onKeyDown={handlingDescription}></textarea>
                <label>Categoria:</label>
                <select required onChange={handlingCategory}>
                  <option disabled>Selecciona Categoria</option>
                  <option>Ropa para hombre</option>
                  <option>Ropa para mujeres</option>
                  <option>Ropa para niños</option>
                  <option>Ropa para niñas</option>
                  <option>Tecnologia</option>
                  <option>Decoracion para la casa</option>
                  <option>Fragancias</option>
                  <option>Comida</option>
                </select>
                <label>Precio:</label>
                <input type="text" placeholder="Precio" onKeyDown={handlingPrice} />
                <label>Disponibilidad:</label>
                <input type="text" placeholder="Disponibilidad" onKeyDown={handlingStock} required />
                <label>Imagenes:</label>
                <input type="text" placeholder="Enlace de las imagenes, (Separa cada url con una coma ',' )." onKeyDown={handlingImgs} required />
                <button type="submit">Publicar Producto</button>
              </form>
            </div>
            <div>
              <h4>Ventas</h4>
              <div>
                <p>Contenido de Ventas</p>
              </div>
            </div>
            <div>
              <h4>Compras</h4>
              <div>
                <p>Contenido de Compras</p>
              </div>
            </div>
          </div>
          <div className="profile-nav">
            <ul>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
                  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-columns-gap" viewBox="0 0 16 16">
                  <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
