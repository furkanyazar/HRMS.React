import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export default function Side() {
  return (
    <div>
      <Menu inverted icon="labeled" vertical>
        <Menu.Item name="ads" as={Link} to={"/"}>
          <Icon name="list ul" />
          İş İlanları
        </Menu.Item>

        <Menu.Item name="factory" as={Link} to={"/employers"}>
          <Icon name="factory" />
          İş Verenler
        </Menu.Item>

        <Menu.Item name="users" as={Link} to={"/employees"}>
          <Icon name="users" />
          Kullanıcılar
        </Menu.Item>
      </Menu>
    </div>
  );
}
