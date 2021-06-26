import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Header, Icon, Table } from "semantic-ui-react";
import UserService from "../services/userService";

export default function ConfirmEmployerDetail() {
  let { id } = useParams();
  let userService = new UserService();
  const history = useHistory();
  const [employer, setEmployer] = useState({});

  useEffect(() => {
    let userService = new UserService();

    userService
      .getEmployerById(id)
      .then((result) => setEmployer(result.data.data));
  }, [id]);

  function activateEmployer(id) {
    userService.setIsActivated(id);
    alert("Kullanıcı onaylandı");
    history.push("/confirmemployers");
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İş veren</Table.HeaderCell>
            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="building" />
                  Şirket Adı
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.companyName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="world" />
                  Web Sitesi
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.website}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="mail" />
                  Email
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.email}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="phone" />
                  Telefon
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.phoneNumber}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="phone" />
                  Onayla
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell><Button onClick={() => activateEmployer(employer.id)}>Onayla</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
