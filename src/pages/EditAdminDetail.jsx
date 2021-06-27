import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import { Button, FormField } from "semantic-ui-react";

export default function EditAdminDetail() {
  const { userItems } = useSelector((state) => state.user);
  let userService = new UserService();
  const history = useHistory();

  const initialValues = {
    name: userItems[0].user.name,
    surname: userItems[0].user.surname,
    email: userItems[0].user.email,
  };

  const schema = Yup.object({
    name: Yup.string().required("Ad zorunlu"),
    surname: Yup.string().required("Soyad zorunlu"),
    email: Yup.string()
      .email("E-posta formatı geçerli değil")
      .required("E-posta zorunlu"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          userService.editAdmin(values, userItems[0].user.id).then((result) => {
              alert(result.data.message);
              if (result.data.success) {
                  history.push("/admindetail/" + userItems[0].user.id);
              }
          })
        }}
      >
        <Form className="ui form">
          <HrmsTextInput name="name" placeholder="Ad" />
          <HrmsTextInput name="surname" placeholder="Soyad" />
          <HrmsTextInput name="email" placeholder="E-posta" />
          <FormField>
            <Button color="yellow" type="submit">
              Kaydet
            </Button>
          </FormField>
        </Form>
      </Formik>
    </div>
  );
}
