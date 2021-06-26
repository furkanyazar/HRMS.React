import React from "react";
import { Formik, Form } from "formik";
import { FormField, Button } from "semantic-ui-react";
import * as Yup from "yup";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import UserService from "../services/userService";
import { useHistory } from "react-router";

export default function EmployerRegister() {
  let userService = new UserService();
  const history = useHistory();

  const initialValues = {
    companyName: "",
    website: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const schema = Yup.object({
    companyName: Yup.string().required("Şirket adı zorunlu"),
    website: Yup.string().required("Site adresi zorunlu"),
    phoneNumber: Yup.string().required("Telefon numarası zorunlu"),
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
          userService.addEmployer(values).then((result) => {
            if (result.data.success) {
              alert(result.data.message);
              history.push("/employerlogin");
            } else {
              alert(result.data.message);
            }
          });
        }}
      >
        <Form className="ui form">
          <HrmsTextInput name="email" placeholder="E-posta" />
          <HrmsTextInput name="password" placeholder="Şifre" type="password" />
          <HrmsTextInput name="companyName" placeholder="Şirket Adı" />
          <HrmsTextInput name="website" placeholder="Web Sitesi" />
          <HrmsTextInput name="phoneNumber" placeholder="Telefon" />
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
