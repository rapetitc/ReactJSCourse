import { Link } from "react-router-dom";

const navLinks = [
  { id: 0, title: "Departamentos", link: "/" },
  { id: 2, title: "Stream Play", link: "/" },
  { id: 2, title: "Music", link: "/" },
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
