import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import ProfileNav from "../ProfileNav/ProfileNav";

const navLinks = [
  { id: 0, title: "Categorias", link: "/product/categories" },
  { id: 2, title: "Contactanos", link: "/contact-us" },
  { id: 2, title: "Sobre Nosotros", link: "/about-us" },
];

const Menu = ({ closeMenu, outerWidth }) => {
  return closeMenu || closeMenu === undefined ? (
    <div className="Menu_Container">
      <nav>
        <ul>
          {outerWidth < 992 ? (
            <li>
              <Link to={"/"} className="link">
                Inicio
              </Link>
            </li>
          ) : null}
          {navLinks.map((links, index) => {
            return (
              <li key={index}>
                <Link to={links.link} className="link">
                  {links.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {outerWidth < 992 ? <ProfileNav /> : null}
    </div>
  ) : null;
};

export default Menu;
