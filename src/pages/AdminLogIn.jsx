import React from "react";
import { Formik, Form } from "formik";
import { FormField, Button } from "semantic-ui-react";
import * as Yup from "yup";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import UserService from "../services/userService";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInAdmin } from "../store/actions/userActions";

export default function AdminLogIn() {
  let userService = new UserService();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAdminLogIn = (user) => {
    dispatch(logInAdmin(user));
  };

  const initialValues = {
    email: "admin@mail.com",
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
          userService.logInAdmin(values).then((result) => {
            if (result.data.data != null) {
              handleAdminLogIn(result.data.data);
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
        </Form>
      </Formik>
    </div>
  );
}
