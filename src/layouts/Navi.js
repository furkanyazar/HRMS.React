import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function Navi() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const history = useHistory();

  function handleSignOut() {
    setisAuthenticated(false);
    history.push("/");
  }

  function handleSignIn() {
    setisAuthenticated(true);
  }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item>
            <Icon name="building outline" />
            HRMS
          </Menu.Item>
          <Menu.Item name="ana sayfa" as={Link} to={"/"} />
          <Menu.Item name="iş ilanlarını onayla" as={Link} to={"/activejobposts"} />

          <Menu.Menu position="right">
            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
