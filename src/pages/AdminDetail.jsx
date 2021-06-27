import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Table,
} from "semantic-ui-react";
import UserService from "../services/userService";

export default function AdminDetail() {
  let userService = new UserService();

  let { id } = useParams();
  const [admin, setAdmin] = useState({});
  const [photos, setPhotos] = useState({});
  const { userItems } = useSelector((state) => state.user);

  useEffect(() => {
    userService.getAdminById(id).then((result) => setAdmin(result.data.data));

    userService
      .getPhotosByUser(id)
      .then((result) => setPhotos(result.data.data));
  }, [id]);

  return (
    <div>
      <Grid>
        <Grid.Column width={4}>
          <Image
            floated="left"
            size="small"
            src={photos.photoLink}
            circular
            key={photos.id}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Card.Header>{admin.name + " " + admin.surname}</Card.Header>
        </Grid.Column>
        <Grid.Column width={4}>
          {userItems[0].type === "admin" && admin.id === userItems[0].user.id && (
            <Button
              color="yellow"
              floated="right"
              as={Link}
              to={"/editadmindetail/" + id}
            >
              Düzenle
            </Button>
          )}
        </Grid.Column>
      </Grid>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Yönetici</Table.HeaderCell>
            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="male" />
                  Ad
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{admin.name}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="male" />
                  Soyad
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{admin.surname}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="mail" />
                  E-posta
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{admin.email}</Table.Cell>
          </Table.Row>
          {userItems[0].type === "admin" && admin.id === userItems[0].user.id && (
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    <Icon name="key" />
                    Şifre
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Button
                  color="yellow"
                  as={Link}
                  to={"/editadminpassword/" + id}
                >
                  Değiştir
                </Button>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
