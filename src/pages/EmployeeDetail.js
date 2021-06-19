import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeService from "../services/employeeService";
import { Card, Table, Header, Button, Icon, Image } from "semantic-ui-react";
import { formatDate } from "../functions";

export default function EmployeeDetail() {
  let { id } = useParams();
  let employeeService = new EmployeeService();

  const [employee, setEmployee] = useState({});
  const [schools, setSchools] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState({});
  const [linkedin, setLinkedin] = useState({});
  const [coverLetter, setCoverLetter] = useState({});
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    employeeService
      .getEmployeeById(id)
      .then((result) => setEmployee(result.data.data));
  }, [id]);

  useEffect(() => {
    employeeService
      .getCoverLetterByUser(id)
      .then((result) => setCoverLetter(result.data.data));
  }, [id]);

  useEffect(() => {
    employeeService
      .getGithubByUser(id)
      .then((result) => setGithub(result.data.data));
  }, [id]);

  useEffect(() => {
    employeeService
      .getLanguagesByUser(id)
      .then((result) => setLanguages(result.data.data));
  }, [id]);

  useEffect(() => {
    employeeService
      .getLinkedinByUser(id)
      .then((result) => setLinkedin(result.data.data));
  }, [id]);

  useEffect(() => {
    employeeService
      .getSchoolsByUser(id)
      .then((result) => setSchools(result.data.data));
  }, [id]);
  
  useEffect(() => {
    employeeService
      .getSkillsByUser(id)
      .then((result) => setSkills(result.data.data));
  }, [id]);

  useEffect(() => {
    employeeService
      .getPhotosByUser(id)
      .then((result) => setPhotos(result.data.data));
  }, [id]);

  return (
    <div>
      <Card.Group>
        <Card fluid>
          <Card.Content>
              <Image
                floated="left"
                size="small"
                src={photos.photoLink}
                circular
                key={photos.id}
              />

            <Card.Header>
              {employee.name + " " + employee.surname}
            </Card.Header>
            <Card.Meta>
              <strong>{coverLetter.article}</strong>
            </Card.Meta>
            <Card.Description>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Kullanıcı</Table.HeaderCell>
                    <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Ad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{employee.name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Soyad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{employee.surname}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Doğum Tarihi</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{formatDate(employee.dateOfBirth)}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Email</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{employee.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={github.githubLink}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button secondary>
                              <Icon name="github" /> Github
                            </Button>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{github.githubLink}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={linkedin.linkedinLink}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button color="linkedin">
                              <Icon name="linkedin" /> LinkedIn
                            </Button>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{linkedin.linkedinLink}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      <Card fluid>
        <Card.Content header="Biyografi" />
        <Card.Content description={coverLetter.article} />
      </Card>

      <Card fluid>
        <Card.Content header="Okuduğu Okullar" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {schools.map((school) => (
              <Table.Row key={school.school.id}>
                <Table.Cell>{school.school.name}</Table.Cell>
                <Table.Cell>{school.department.name}</Table.Cell>
                <Table.Cell>{formatDate(school.startingDate)}</Table.Cell>
                <Table.Cell>{formatDate(school.endingDate)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid>
        <Card.Content header="Yabancı Diller" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil Adı</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {languages.map((language) => (
              <Table.Row key={language.language.id}>
                <Table.Cell>{language.language.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid>
        <Card.Content header="Yazılım Teknolojileri" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {skills.map((skill) => (
              <Table.Row key={skill.skill.id}>
                <Table.Cell>{skill.skill.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
