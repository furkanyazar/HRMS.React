import React from "react";
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Menu inverted>
        <Menu.Item>
          <Button.Group>
            <Button onClick={signIn}>Firma Girişi</Button>
          </Button.Group>
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button primary>Kayıt Ol</Button>
            <Button.Or />
            <Button positive>Giriş Yap</Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    </div>
  );
}
