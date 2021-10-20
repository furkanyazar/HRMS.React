import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Icon, Menu, Table, Button, Grid } from "semantic-ui-react";
import Sidebar from "../layouts/Sidebar";
import JobPostingService from "../services/jobPostingService";

export default function Home() {
  let { city, workingTime } = useParams();
  let jobPostingService = new JobPostingService();

  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    if (city > 0 && workingTime > 0) {
      jobPostingService
        .getByCityAndWorkingTime(city, workingTime)
        .then((result) => setJobPostings(result.data.data));
    } else if (city == 0 && workingTime > 0) {
      jobPostingService
        .getByWorkingTime(workingTime)
        .then((result) => setJobPostings(result.data.data));
    } else if (city > 0 && workingTime == 0) {
      jobPostingService
        .getByCity(city)
        .then((result) => setJobPostings(result.data.data));
    } else {
      jobPostingService
        .getJobPostings()
        .then((result) => setJobPostings(result.data.data));
    }
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Column width={4}>
          <Sidebar />
        </Grid.Column>
        <Grid.Column width={12}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                <Table.HeaderCell>Şirket</Table.HeaderCell>
                <Table.HeaderCell>Şehir</Table.HeaderCell>
                <Table.HeaderCell>Detaylar</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {jobPostings.map((jobPosting) => (
                <Table.Row key={jobPosting.id}>
                  <Table.Cell>{jobPosting.job.name}</Table.Cell>
                  <Table.Cell>{jobPosting.user.companyName}</Table.Cell>
                  <Table.Cell>{jobPosting.city.name}</Table.Cell>
                  <Table.Cell>
                    <Button as={Link} to={"/jobdetail/" + jobPosting.id}>
                      Detayları Gör
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
        </Grid.Column>
      </Grid>
    </div>
  );
}
