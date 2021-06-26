import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Menu inverted>
        <Menu.Item>
          <Button.Group>
            <Button as={Link} to="/employerlogin">
              Firma Girişi
            </Button>
          </Button.Group>
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button primary as={Link} to="/userregister">
              Kayıt Ol
            </Button>
            <Button.Or />
            <Button positive as={Link} to="/userlogin">
              Giriş Yap
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    </div>
  );
}
