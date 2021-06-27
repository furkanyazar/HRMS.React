import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import { Button, FormField } from "semantic-ui-react";

export default function EditEmployerDetail() {
  const { userItems } = useSelector((state) => state.user);
  let userService = new UserService();
  const history = useHistory();

  const initialValues = {
    companyName: userItems[0].user.user.companyName,
    website: userItems[0].user.user.website,
    email: userItems[0].user.user.email,
    phoneNumber: userItems[0].user.user.phoneNumber,
  };

  const schema = Yup.object({
    companyName: Yup.string().required("Şirket adı zorunlu"),
    website: Yup.string().required("Site adresi zorunlu"),
    email: Yup.string()
      .email("E-posta formatı geçerli değil")
      .required("E-posta zorunlu"),
    phoneNumber: Yup.string().required("Telefon numarası zorunlu"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          userService
            .editEmployer(values, userItems[0].user.user.id)
            .then((result) => {
              alert(result.data.message);
              if (result.data.success) {
                history.push("/employerdetail/" + userItems[0].user.user.id);
              }
            });
        }}
      >
        <Form className="ui form">
          <HrmsTextInput name="companyName" placeholder="Şirket Adı" />
          <HrmsTextInput name="website" placeholder="Site Adresi" />
          <HrmsTextInput name="email" placeholder="E-posta" />
          <HrmsTextInput name="phoneNumber" placeholder="Telefon Numarası" />
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
