import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

const navLinks = [
  { id: 0, title: "Categorias", link: "/product/categories" },
  { id: 1, title: "Tienda", link: "/store" },
  { id: 2, title: "Contactanos", link: "/contact-us" },
  { id: 2, title: "Sobre Nosotros", link: "/about-us" },
];
const Menu = () => {
  return (
    <div className="menu-Container">
      <div>
        <nav>
          {navLinks.map((links, index) => {
            return (
              <Link key={index} to={links.link} className="link">
                {links.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Menu;
