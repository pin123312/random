import "./App.css";
import "./speed.css";
import { NavLink, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const gameItems = [
    {
      id: 1,
      path: "/Memory",
      img: "",
      name: "Memory Game",
    },
    {
      id: 2,
      path: "/Speed",
      img: "",
      name: "Speed Game",
    },
  ];

  const game = gameItems.map((items, index) => (
    <li key={items.id} className="gameMenu-list-item ">
      <NavLink to={items.path}>{items.name}</NavLink>
    </li>
  ));

  return (
    <>
      <div className="gameMenu-list">{game}</div>
    </>
  );
}

export default Landing;
