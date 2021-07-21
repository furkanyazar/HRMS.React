import React from "react";
import { Formik, Form } from "formik";
import { FormField, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import UserService from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../store/actions/userActions";
import JobPostingService from "../services/jobPostingService";
import { addToFav } from "../store/actions/favActions";

export default function UserLogIn() {
  let userService = new UserService();
  let jobPostingService = new JobPostingService();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleUserLogIn = (user) => {
    dispatch(logInUser(user));
    jobPostingService.getFavs(user.id).then((result) => {
      result.data.data.forEach((fav) => {
        dispatch(addToFav(fav));
      });
    });
  };

  const initialValues = {
    email: "user@mail.com",
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
          userService.logInUser(values).then((result) => {
            if (result.data.data != null) {
              handleUserLogIn(result.data.data);
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
