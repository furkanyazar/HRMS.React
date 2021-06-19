import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";

export default function SignedIn({ signOut }) {
  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src="https://i.pinimg.com/originals/b3/5f/c7/b35fc7144c81956c683df40833b87469.jpg"
        />
        <Dropdown pointing="top right" text="Furkan">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/newjobposting"} text="İş ilanı ekle" icon="add" />
            <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
