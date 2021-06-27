import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

export default function Favs() {
  const { favItems } = useSelector((state) => state.fav);

  return (
    <div>
      <Dropdown item text="Favorileriniz">
        <Dropdown.Menu>
          {favItems.map((favItem) => (
            <Dropdown.Item
              as={Link}
              to={"/jobdetail/" + favItem.fav.id}
              key={favItem.fav.id}
            >
              {favItem.fav.job.name + " in " + favItem.fav.user.companyName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
