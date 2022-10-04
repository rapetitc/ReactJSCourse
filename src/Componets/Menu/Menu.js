import React from "react";

const style = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  link: {
    margin: "5px",
  },
};
const navLinks = [
  { id: 0, title: "Inicio", link: "./" },
  { id: 1, title: "Tienda", link: "./" },
  { id: 2, title: "Contactanos", link: "./" },
  { id: 2, title: "Sobre Nosotros", link: "./" },
];
const Menu = () => {
  return (
    <div style={style.container}>
      <nav style={style.menu}>
        {navLinks.map((links) => {
          return (
            <a key={links.id} href={links.link} className="btn btn-primary" style={style.link}>
              {links.title}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Menu;
