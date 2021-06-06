import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item>
            <Icon name="building outline" />
            HRMS
          </Menu.Item>
          <Menu.Item name="home" />

          <Menu.Menu position="right">
            <Menu.Item>
              <Button.Group>
                <Button primary>Sign Up</Button>
                <Button.Or />
                <Button positive>Sign In</Button>
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
