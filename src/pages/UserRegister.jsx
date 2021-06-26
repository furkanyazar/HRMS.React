import React from "react";
import { Formik, Form } from "formik";
import { FormField, Button } from "semantic-ui-react";
import * as Yup from "yup";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import UserService from "../services/userService";
import { useHistory } from "react-router";

export default function UserRegister() {
  let userService = new UserService();
  const history = useHistory();

  const initialValues = {
    name: "",
    surname: "",
    identityNumber: "",
    email: "",
    password: "",
    dateOfBirth: "",
  };

  const schema = Yup.object({
    name: Yup.string().required("Ad zorunlu"),
    surname: Yup.string().required("Soyad zorunlu"),
    identityNumber: Yup.string().required("Kimlik numarası zorunlu"),
    email: Yup.string()
      .email("E-posta formatı geçerli değil")
      .required("E-posta zorunlu"),
    password: Yup.string().required("Şifre zorunlu"),
    dateOfBirth: Yup.date().nullable().required("Doğum tarihi zorunlu"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          userService.addUser(values).then((result) => {
            if (result.data.success) {
              alert(result.data.message);
              history.push("/userlogin");
            } else {
              alert(result.data.message);
            }
          });
        }}
      >
        <Form className="ui form">
          <HrmsTextInput name="email" placeholder="E-posta" />
          <HrmsTextInput name="password" placeholder="Şifre" type="password" />
          <HrmsTextInput name="name" placeholder="Ad" />
          <HrmsTextInput name="surname" placeholder="Soyad" />
          <HrmsTextInput
            name="identityNumber"
            placeholder="Kimlik Numarası"
            type="number"
          />
          <HrmsTextInput
            name="dateOfBirth"
            placeholder="Doğum Tarihi"
            type="date"
          />
          <FormField>
            <Button color="yellow" type="submit">
              Kayıt Ol
            </Button>
          </FormField>
        </Form>
      </Formik>
    </div>
  );
}
