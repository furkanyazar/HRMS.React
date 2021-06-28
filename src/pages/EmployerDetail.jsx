import React, { useEffect, useState } from "react";
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
import JobPostingService from "../services/jobPostingService";
import { useSelector } from "react-redux";

export default function EmployerDetail() {
  let { id } = useParams();
  let userService = new UserService();
  let jobPostingService = new JobPostingService();

  const [employer, setEmployer] = useState({});
  const [jobAds, setJobAds] = useState([]);
  const [photos, setPhotos] = useState({});
  const { userItems } = useSelector((state) => state.user);

  useEffect(() => {
    userService
      .getEmployerById(id)
      .then((result) => setEmployer(result.data.data));

    userService
      .getPhotosByUser(id)
      .then((result) => setPhotos(result.data.data));

    jobPostingService
      .getByIsActivatedAndUserId(id)
      .then((result) => setJobAds(result.data.data));
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
          <Card.Header>{employer.companyName}</Card.Header>
          <Card.Meta>
            <strong>{employer.website}</strong>
          </Card.Meta>
        </Grid.Column>
        <Grid.Column width={4}>
          {userItems.type === "employer" &&
            employer.id === userItems.user.user.id && (
              <Button
                color="yellow"
                floated="right"
                as={Link}
                to={"/editemployerdetail/" + employer.id}
              >
                Düzenle
              </Button>
            )}
        </Grid.Column>
      </Grid>
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
          {userItems.type === "employer" &&
            employer.id === userItems.user.user.id && (
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
                    to={"/editemployerpassword/" + id}
                  >
                    Değiştir
                  </Button>
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table>

      <Card fluid>
        <Card.Content header="Bu Şirkete Ait İş İlanları" />
        <Card.Content>
          <Table color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                <Table.HeaderCell>Şehir</Table.HeaderCell>
                <Table.HeaderCell>Açık Pozisyon</Table.HeaderCell>
                <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                <Table.HeaderCell>Detaylar</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {jobAds.map((jobAd) => (
                <Table.Row key={jobAd.id}>
                  <Table.Cell>{jobAd.job?.name}</Table.Cell>
                  <Table.Cell>{jobAd.city?.name}</Table.Cell>
                  <Table.Cell>{jobAd.openPosition}</Table.Cell>
                  <Table.Cell>{jobAd.workplace?.name}</Table.Cell>
                  <Table.Cell>{jobAd.workingTime?.name}</Table.Cell>
                  <Table.Cell>
                    <Button as={Link} to={"/jobdetail/" + jobAd.id}>
                      <Button.Content visible>Detayları Gör</Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Content extra>
          <Icon name="list" />
          {jobAds?.length} Adet İş ilanı mevcut
        </Card.Content>
      </Card>
    </div>
  );
}
