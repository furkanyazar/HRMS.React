import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import { Button, FormField } from "semantic-ui-react";
import { formatDate2 } from "../functions";
import HrmsTextArea from "../utilities/customFormControls/HrmsTextArea";

export default function EditUserDetail() {
  let userService = new UserService();

  const { userItems } = useSelector((state) => state.user);
  const history = useHistory();

  const initialValues = {
    name: userItems[0].user.name,
    surname: userItems[0].user.surname,
    dateOfBirth: formatDate2(userItems[0].user.dateOfBirth),
    email: userItems[0].user.email,
    githubLink: "",
    linkedinLink: "",
    coverLetter: "",
  };

  const schema = Yup.object({
    name: Yup.string().required("Ad zorunlu"),
    surname: Yup.string().required("Soyad zorunlu"),
    email: Yup.string()
      .email("E-posta formatı geçerli değil")
      .required("E-posta zorunlu"),
    dateOfBirth: Yup.string().required("Doğum tarihi zorunlu"),
    githubLink: Yup.string(),
    linkedinLink: Yup.string(),
    coverLetter: Yup.string(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          userService
            .editEmployee(
              values,
              userItems[0].user.id,
              values.coverLetter,
              values.githubLink,
              values.linkedinLink
            )
            .then((result) => {
              alert(result.data.message);
              if (result.data.success) {
                history.push("/userdetail/" + userItems[0].user.id);
              }
            });
        }}
      >
        <Form className="ui form">
          <HrmsTextInput name="name" placeholder="Ad" />
          <HrmsTextInput name="surname" placeholder="Soyad" />
          <HrmsTextInput
            name="dateOfBirth"
            placeholder="Doğum Tarihi"
            type="date"
          />
          <HrmsTextInput name="email" placeholder="E-posta" />
          <HrmsTextInput name="githubLink" placeholder="Github Link" />
          <HrmsTextInput name="linkedinLink" placeholder="LinkedIn Link" />
          <HrmsTextArea name="coverLetter" placeholder="Ön Yazı" />
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
