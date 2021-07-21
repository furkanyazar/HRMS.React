import React from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import { useSelector } from "react-redux";
import SignedInAdmin from "./SignedInAdmin";
import SignedInEmployer from "./SignedInEmployer";
import SignedInUser from "./SignedInUser";
import Favs from "./Favs";

export default function Navi() {
  const { userItems } = useSelector((state) => state.user);
  const { favItems } = useSelector((state) => state.fav);

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
            {userItems.type === "admin" && (
              <Menu.Item
                name="onay bekleyen ilanlar"
                as={Link}
                to={"/confirmads"}
              />
            )}
            {userItems.type === "admin" && (
              <Menu.Item
                name="onay bekleyen firmalar"
                as={Link}
                to={"/confirmemployers"}
              />
            )}
            {userItems.type === "admin" && (
              <Menu.Item
                name="firma değişiklikleri"
                as={Link}
                to={"/confirmemployerupdates"}
              />
            )}
          </Menu.Menu>

          <Menu.Menu position="right">
            {favItems.length > 0 && userItems.type === "user" && <Favs />}
            {userItems.type === "admin" && <SignedInAdmin />}
            {userItems.type === "employer" && <SignedInEmployer />}
            {userItems.type === "user" && <SignedInUser />}
            {userItems.type === "logout" && <SignedOut />}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
