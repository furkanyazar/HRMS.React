import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Header, Icon, Table } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import { formatDate } from '../functions';

export default function JobDetail() {
  let { id } = useParams();

  const [jobAd, setJobAd] = useState({});

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getJobById(id)
      .then((result) => setJobAd(result.data.data));
  }, [id]);

  return (
    <div>
      <div>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <Table celled color={"black"} stackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>İş veren</Table.HeaderCell>
                    <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row textAlign={"left"}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="building" />
                          Şirket Adı
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{jobAd.user?.companyName}</Table.Cell>
                  </Table.Row>

                  <Table.Row textAlign={"left"}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="mail" />
                          Email
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{jobAd.user?.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row textAlign={"left"}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="phone" />
                          Telefon
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{jobAd.user?.phoneNumber}</Table.Cell>
                  </Table.Row>

                  <Table.Row textAlign={"left"}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="world" />
                          Web Sitesi
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{jobAd.user?.website}</Table.Cell>
                  </Table.Row>

                  <Table.Row textAlign={"left"}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="list ul" />
                          Detaylar
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        as={Link}
                        to={"/employerdetail/" + jobAd.user?.id}
                      >
                        <Button.Content>Detayları Gör</Button.Content>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={10}>
              <Table celled fixed singleLine color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>İş İlanı</Table.HeaderCell>
                    <Table.HeaderCell>Detaylar</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>İş Pozisyonu</Table.Cell>
                    <Table.Cell>{jobAd.job?.name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Şehir</Table.Cell>
                    <Table.Cell>{jobAd.city?.name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Çalışma Yeri</Table.Cell>
                    <Table.Cell>{jobAd.workplace?.name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Çalışma Zamanı</Table.Cell>
                    <Table.Cell>{jobAd.workingTime?.name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Maaş Aralığı</Table.Cell>
                    <Table.Cell>{jobAd.salaryRange}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Açık Pozisyonlar</Table.Cell>
                    <Table.Cell>{jobAd.openPosition}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Son Başvuru Tarihi</Table.Cell>
                    <Table.Cell>{formatDate(jobAd.lastDate)}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Card fluid>
          <Card.Content header="Açıklama" />
          <Card.Content>{jobAd.description}</Card.Content>
        </Card>
      </div>
    </div>
  );
}
