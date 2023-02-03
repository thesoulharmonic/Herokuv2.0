import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const className = "menuButton";
  const [page1, setPage1] = useState("./");
  const [page2, setPage2] = useState("./newproject");

  return (
    <nav>
      <Link to={page1}>
        <button className={className}>Projects</button>
      </Link>
      <Link to={page2}>
        <button className={className}>New Project</button>
      </Link>
    </nav>
  );
};

export default Menu;
