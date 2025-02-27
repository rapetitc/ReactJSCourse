import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { id: 0, title: "Categorias", link: "/categories" },
  { id: 2, title: "Stream Play", link: "/" }, //TODO URL
  { id: 2, title: "Music", link: "/" }, //TODO URL
];

const Menu = () => {
  return (
    <nav className="w-full mx-4">
      <ul className="flex gap-2">
        {navLinks.map((links, index) => {
          return (
            <li key={index}>
              <Link to={links.link} className="text-sm">
                {links.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
