import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Card, Dropdown, Grid, Input } from "semantic-ui-react";
import { formatDate2 } from "../functions";

export default function AddSchool() {
  let { id } = useParams();
  let userService = new UserService();

  const history = useHistory();
  const [schools, setSchools] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { userItems } = useSelector((state) => state.user);

  if (id != userItems.user.id) {
    history.push("/");
  }

  useEffect(() => {
    userService.getSchools().then((result) => setSchools(result.data.data));
    userService
      .getDepartments()
      .then((result) => setDepartments(result.data.data));
  }, []);

  const schema = Yup.object().shape({
    schools: Yup.string().required("Okul adı zorunlu"),
    departments: Yup.string().required("Bölüm adı zorunlu"),
    startingDate: Yup.date().required("Başlangıç tarihi zorunlu"),
    endingDate: Yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      schools: "",
      departments: "",
      startingDate: "",
      endingDate: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let isEndDateNull = true;

      if (values.endingDate !== "") {
        isEndDateNull = false;
      }

      let postModel = {
        user: { id: id },
        school: { id: values.schools },
        department: { id: values.departments },
        startingDate: formatDate2(values.startingDate),
        endingDate: isEndDateNull ? null : formatDate2(values.endingDate),
      };

      userService
        .addEducation(postModel)
        .then((result) => console.log(result.data.data));
      alert("eklendi");
      history.push("/userdetail/" + userItems.user.id);
    },
  });

  const schoolOptions = schools.map((school, index) => ({
    key: index,
    text: school.name,
    value: school.id,
  }));

  const departmentOptions = departments.map((department, index) => ({
    key: index,
    text: department.name,
    value: department.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content header="Eğitim Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field style={{ marginBottom: "1rem" }}>
              <label>Okul</label>
              <Dropdown
                clearable
                item
                placeholder="Okul"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "schools")
                }
                onBlur={formik.onBlur}
                id="schools"
                value={formik.values.schools}
                options={schoolOptions}
              />
              {formik.errors.schools && formik.touched.schools && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.schools}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Bölüm</label>
              <Dropdown
                clearable
                item
                placeholder="Bölüm"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "departments")
                }
                onBlur={formik.onBlur}
                id="departments"
                value={formik.values.departments}
                options={departmentOptions}
              />
              {formik.errors.departments && formik.touched.departments && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.departments}
                </div>
              )}
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>Başlangıç Tarihi</label>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.lastDate)}
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "startingDate")
                    }
                    value={formik.values.startingDate}
                    onBlur={formik.handleBlur}
                    name="startingDate"
                    placeholder="Başlangıç Tarihi"
                  />
                  {formik.errors.startingDate &&
                    formik.touched.startingDate && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.startingDate}
                      </div>
                    )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>Bitiş Tarihi</label>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.endingDate)}
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "endingDate")
                    }
                    value={formik.values.endingDate}
                    onBlur={formik.handleBlur}
                    name="endingDate"
                    placeholder="Bitiş Tarihi"
                  />
                  {formik.errors.endingDate && formik.touched.endingDate && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.endingDate}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
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
