import React from "react";
import { Icon, Menu } from "semantic-ui-react";

export default function Side() {
  return (
    <div>
      <Menu inverted icon="labeled" vertical>
        <Menu.Item name="gamepad">
          <Icon name="gamepad" />
          Job Postings
        </Menu.Item>

        <Menu.Item name="video camera">
          <Icon name="video camera" />
          Channels
        </Menu.Item>

        <Menu.Item name="video play">
          <Icon name="video play" />
          Videos
        </Menu.Item>
      </Menu>
    </div>
  );
}
