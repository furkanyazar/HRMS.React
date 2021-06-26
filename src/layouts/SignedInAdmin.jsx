import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/actions/userActions";

export default function SignedInAdmin() {
  const { userItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src="https://i.pinimg.com/originals/b3/5f/c7/b35fc7144c81956c683df40833b87469.jpg"
        />
        <Dropdown pointing="top right" text={userItems[0].user.name}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/"} text="Bilgilerim" icon="info" />
            <Dropdown.Item onClick={() => handleLogOut()} text="Çıkış Yap" icon="sign-out" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
