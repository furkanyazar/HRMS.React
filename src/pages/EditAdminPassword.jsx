import React from "react";
import { useHistory } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import { Button, FormField } from "semantic-ui-react";
import { useSelector } from "react-redux";

export default function EditAdminPassword() {
  const { userItems } = useSelector((state) => state.user);
  let userService = new UserService();
  const history = useHistory();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const schema = Yup.object({
    oldPassword: Yup.string().required("Eski şifre zorunlu"),
    newPassword: Yup.string().required("Yeni şifre zorunlu"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          userService
            .setNewPassword(
              userItems.user.id,
              values.oldPassword,
              values.newPassword
            )
            .then((result) => {
              alert(result.data.message);
              if (result.data.success) {
                history.push("/admindetail/" + userItems.user.id);
              }
            });
        }}
      >
        <Form className="ui form">
          <HrmsTextInput
            name="oldPassword"
            placeholder="Eski Şifre"
            type="password"
          />
          <HrmsTextInput
            name="newPassword"
            placeholder="Yeni Şifre"
            type="password"
          />
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
