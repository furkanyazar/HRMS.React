import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";

export default function ActiveJobPosts() {
  let jobPostingService = new JobPostingService();
  const [jobPostings, setJobPostings] = useState([]);
  const history = useHistory();

  function activateJob(id) {
    jobPostingService.setIsActivated(id);
    alert("İlan onaylandı");
    history.push("/");
  }

  useEffect(() => {
    jobPostingService
      .getIsNotActiveJobPostings()
      .then((result) => setJobPostings(result.data.data));
  }, []);

  return (
    <div>
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
                <Button onClick={() => activateJob(jobPosting.id)}>
                  Onayla
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
