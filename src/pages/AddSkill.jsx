import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Card, Dropdown } from "semantic-ui-react";

export default function AddSkill() {
  let { id } = useParams();
  let userService = new UserService();

  const history = useHistory();
  const [skills, setSkills] = useState([]);
  const { userItems } = useSelector((state) => state.user);

  if (id !== userItems.user.id) {
    history.push("/");
  }

  useEffect(() => {
    userService.getSkills().then((result) => setSkills(result.data.data));
  }, []);

  const schema = Yup.object().shape({
    skills: Yup.string().required("Yetenek adı zorunlu"),
  });

  const formik = useFormik({
    initialValues: {
        skills: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let postModel = {
        user: { id: id },
        skill: { id: values.skills },
      };

      userService
        .addSkill(postModel)
        .then((result) => console.log(result.data.data));
      alert("eklendi");
      history.push("/userdetail/" + userItems.user.id);
    },
  });

  const skillOptions = skills.map((skill, index) => ({
    key: index,
    text: skill.name,
    value: skill.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content header="Yetenek Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field style={{ marginBottom: "1rem" }}>
              <label>Yetenek</label>
              <Dropdown
                clearable
                item
                placeholder="Yetenek"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "skills")
                }
                onBlur={formik.onBlur}
                id="skills"
                value={formik.values.skills}
                options={skillOptions}
              />
              {formik.errors.skills && formik.touched.skills && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.skills}
                </div>
              )}
            </Form.Field>

            <Button
              content="Ekle"
              labelPosition="right"
              icon="add"
              positive
              type="submit"
            />
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
