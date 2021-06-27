import React from "react";
import { Formik, Form } from "formik";
import { FormField, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import UserService from "../services/userService";
import { useDispatch } from "react-redux";
import { logInEmployer } from "../store/actions/userActions";

export default function EmployerLogIn() {
  let userService = new UserService();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEmployerLogIn = (user) => {
    dispatch(logInEmployer(user));
  };

  const initialValues = {
    email: "company@mail.com",
    password: "12345678",
  };

  const schema = Yup.object({
    email: Yup.string()
      .email("E-posta formatı geçerli değil")
      .required("E-posta zorunlu"),
    password: Yup.string().required("Şifre zorunlu"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          userService.logInEmployer(values).then((result) => {
            if (result.data.data != null) {
              handleEmployerLogIn(result.data.data);
              history.push("/");
            } else {
              alert("Hatalı giriş");
            }
          });
        }}
      >
        <Form className="ui form">
          <HrmsTextInput name="email" placeholder="E-posta" />
          <HrmsTextInput name="password" placeholder="Şifre" type="password" />
          <FormField>
            <Button color="green" type="submit">
              Giriş Yap
            </Button>
          </FormField>
          <Button color="yellow" as={Link} to="/employerregister">
            Kayıt Ol
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
