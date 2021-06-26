import React from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import { useSelector } from "react-redux";
import SignedInAdmin from "./SignedInAdmin";
import SignedInEmployer from "./SignedInEmployer";
import SignedInUser from "./SignedInUser";

export default function Navi() {
  const { userItems } = useSelector((state) => state.user);

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Menu position="left">
            <Menu.Item>
              <Icon name="building outline" />
              HRMS
            </Menu.Item>
            <Menu.Item name="ana sayfa" as={Link} to={"/"} />
            {userItems[0].type === "admin" && <Menu.Item name="onay bekleyen ilanlar" as={Link} to={"/confirmads"} />}
            {userItems[0].type === "admin" && <Menu.Item name="onay bekleyen firmalar" as={Link} to={"/confirmemployers"}/>}
          </Menu.Menu>

          <Menu.Menu position="right">
            {userItems[0].type === "admin" && <SignedInAdmin />}
            {userItems[0].type === "employer" && <SignedInEmployer />}
            {userItems[0].type === "user" && <SignedInUser />}
            {userItems[0].type === "logout" && <SignedOut />}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
