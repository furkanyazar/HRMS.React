import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../services/userService";
import {
  Card,
  Table,
  Header,
  Button,
  Icon,
  Image,
  Grid,
} from "semantic-ui-react";
import { formatDate } from "../functions";
import { useSelector } from "react-redux";

export default function UserDetail() {
  let { id } = useParams();
  let userService = new UserService();

  const [employee, setEmployee] = useState({});
  const [schools, setSchools] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState({});
  const [linkedin, setLinkedin] = useState({});
  const [coverLetter, setCoverLetter] = useState({});
  const [photos, setPhotos] = useState({});
  const { userItems } = useSelector((state) => state.user);

  const handleRemoveEducation = (id) => {
    userService
      .deleteEducation(id)
      .then((result) => alert(result.data.message));
  };

  const handleRemoveLanguage = (id) => {
    userService
      .deleteLanguage(id)
      .then((result) => alert(result.data.message));
  };

  const handleRemoveSkill = (id) => {
    userService
      .deleteSkill(id)
      .then((result) => alert(result.data.message));
  };

  useEffect(() => {
    userService
      .getEmployeeById(id)
      .then((result) => setEmployee(result.data.data));
  }, [id]);

  useEffect(() => {
    userService
      .getCoverLetterByUser(id)
      .then((result) => setCoverLetter(result.data.data));
  }, [id]);

  useEffect(() => {
    userService
      .getGithubByUser(id)
      .then((result) => setGithub(result.data.data));
  }, [id]);

  useEffect(() => {
    userService
      .getLanguagesByUser(id)
      .then((result) => setLanguages(result.data.data));
  }, [id]);

  useEffect(() => {
    userService
      .getLinkedinByUser(id)
      .then((result) => setLinkedin(result.data.data));
  }, [id]);

  useEffect(() => {
    userService
      .getSchoolsByUser(id)
      .then((result) => setSchools(result.data.data));
  }, [id]);

  useEffect(() => {
    userService
      .getSkillsByUser(id)
      .then((result) => setSkills(result.data.data));
  }, [id]);

  useEffect(() => {
    userService
      .getPhotosByUser(id)
      .then((result) => setPhotos(result.data.data));
  }, [id]);

  return (
    <div>
      <Card.Group>
        <Card fluid>
          <Card.Content>
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
                <Card.Header>
                  {employee.name + " " + employee.surname}
                </Card.Header>
                <Card.Meta>
                  <strong>{coverLetter.article}</strong>
                </Card.Meta>
              </Grid.Column>
              <Grid.Column width={4}>
                {userItems.type === "user" &&
                  employee.id === userItems.user.id && (
                    <Button
                      color="yellow"
                      floated="right"
                      as={Link}
                      to={"/edituserdetail/" + employee.id}
                    >
                      {" "}
                      Düzenle{" "}
                    </Button>
                  )}
              </Grid.Column>
            </Grid>
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
                        <Header.Content>
                          <Icon name="male" />
                          Ad
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{employee.name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="male" />
                          Soyad
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{employee.surname}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="calendar alternate" />
                          Doğum Tarihi
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{formatDate(employee.dateOfBirth)}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <Icon name="mail" />
                          E-posta
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{employee.email}</Table.Cell>
                  </Table.Row>
                  {userItems.type === "user" &&
                    employee.id === userItems.user.id && (
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
                            to={"/edituserpassword/" + id}
                          >
                            Değiştir
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    )}
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
        <Card.Content>
          <Card.Header>Okuduğu Okullar</Card.Header>
        </Card.Content>
        <Button color="green" as={Link} to={"/addschool/" + userItems.user.id}>
          Ekle
        </Button>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Kaldır</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {schools.map((school) => (
              <Table.Row key={school.school.id}>
                <Table.Cell>{school.school.name}</Table.Cell>
                <Table.Cell>{school.department.name}</Table.Cell>
                <Table.Cell>{formatDate(school.startingDate)}</Table.Cell>
                <Table.Cell>
                  {school.endingDate !== null && formatDate(school.endingDate)}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="red"
                    onClick={() => handleRemoveEducation(school.id)}
                  >
                    Kaldır
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid>
        <Card.Content>
          <Card.Header>Yabancı Diller</Card.Header>
        </Card.Content>
        <Button
          color="green"
          as={Link}
          to={"/addlanguage/" + userItems.user.id}
        >
          Ekle
        </Button>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil Adı</Table.HeaderCell>
              <Table.HeaderCell>Kaldır</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {languages.map((language) => (
              <Table.Row key={language.language.id}>
                <Table.Cell>{language.language.name}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => handleRemoveLanguage(language.id)}>Kaldır</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid>
        <Card.Content>
          <Card.Header>Teknolojiler</Card.Header>
        </Card.Content>
        <Button color="green" as={Link} to={"/addskill/" + userItems.user.id}>
          Ekle
        </Button>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
              <Table.HeaderCell>Kaldır</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {skills.map((skill) => (
              <Table.Row key={skill.skill.id}>
                <Table.Cell>{skill.skill.name}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => handleRemoveSkill(skill.id)}>Kaldır</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
