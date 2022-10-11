import React from "react";
import "./Menu.css"

const navLinks = [
  { id: 0, title: "Inicio", link: "./" },
  { id: 1, title: "Tienda", link: "./" },
  { id: 2, title: "Contactanos", link: "./" },
  { id: 2, title: "Sobre Nosotros", link: "./" },
];
const Menu = () => {
  return (
    <div className="menu-Container">
      <nav>
        {navLinks.map((links) => {
          return (
            <a key={links.id} href={links.link} className="link">
              {links.title}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Menu;
