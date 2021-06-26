import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import UserService from "../services/userService";

export default function ConfirmEmployers() {
  let userService = new UserService();
  const [employers, setEmployers] = useState([]);
  
  useEffect(() => {
    userService
      .getIsNotActiveEmployers()
      .then((result) => setEmployers(result.data.data));
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>E-posta</Table.HeaderCell>
            <Table.HeaderCell>Telefon</Table.HeaderCell>
            <Table.HeaderCell>Detaylar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employers.map((employer) => (
            <Table.Row key={employer.id}>
              <Table.Cell>{employer.user.companyName}</Table.Cell>
              <Table.Cell>{employer.user.email}</Table.Cell>
              <Table.Cell>{employer.user.phoneNumber}</Table.Cell>
              <Table.Cell>
                <Button as={Link} to={"/confirmemployersdetail/" + employer.user.id}>
                  Detaylar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
