import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Card, Dropdown } from "semantic-ui-react";

export default function AddLanguage() {
  let { id } = useParams();
  let userService = new UserService();

  const history = useHistory();
  const [languages, setLanguages] = useState([]);
  const { userItems } = useSelector((state) => state.user);

  if (id !== userItems.user.id) {
    history.push("/");
  }

  useEffect(() => {
    userService.getLanguages().then((result) => setLanguages(result.data.data));
  }, []);

  const schema = Yup.object().shape({
    languages: Yup.string().required("Dil adı zorunlu"),
  });

  const formik = useFormik({
    initialValues: {
      languages: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let postModel = {
        user: { id: id },
        language: { id: values.languages },
      };

      userService
        .addLanguage(postModel)
        .then((result) => console.log(result.data.data));
      alert("eklendi");
      history.push("/userdetail/" + userItems.user.id);
    },
  });

  const languageOptions = languages.map((language, index) => ({
    key: index,
    text: language.name,
    value: language.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content header="Dil Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field style={{ marginBottom: "1rem" }}>
              <label>Dil</label>
              <Dropdown
                clearable
                item
                placeholder="Dil"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "languages")
                }
                onBlur={formik.onBlur}
                id="languages"
                value={formik.values.languages}
                options={languageOptions}
              />
              {formik.errors.languages && formik.touched.languages && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.languages}
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
