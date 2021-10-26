import React, { useState, useEffect } from "react";
import { Form, Dropdown, Menu, Button } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  let jobPostingService = new JobPostingService();
  const history = useHistory();

  const [cities, setCities] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  const jobPostingSchema = Yup.object().shape({
    workingTime: Yup.string(),
    city: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      workingTime: 0,
      city: 0,
    },
    validationSchema: jobPostingSchema,
    onSubmit: (values) => {
      let postModel = {
        city: { id: values.city },
        workingTime: { id: values.workingTime },
      };
      history.push(
        "/home/" + postModel.city.id + "/" + postModel.workingTime.id
      );
    },
  });

  useEffect(() => {
    jobPostingService
      .getAllCities()
      .then((result) => setCities(result.data.data));

    jobPostingService
      .getAllWorkingTimes()
      .then((result) => setWorkingTimes(result.data.data));
  });

  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));

  const workingTimeOptions = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.name,
    value: workingTime.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Menu vertical>
        <Menu.Item>
          <Form.Field>
            {/* <label>Şehir</label> */}
            <Dropdown
              // clearable
              item
              placeholder="Şehir"
              // search
              selection
              onChange={(event, data) =>
                handleChangeSemantic(data.value, "city")
              }
              //onBlur={formik.onBlur}
              id="city"
              value={formik.values.city}
              options={cityOptions}
            />
            {/* {formik.errors.city && formik.touched.city && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.city}
                </div>
              )} */}
          </Form.Field>
        </Menu.Item>
        <Menu.Item>
          <Form.Field>
            {/* <label>Çalışma Süresi</label> */}
            <Dropdown
              // clearable
              item
              placeholder="Çalışma Süresi"
              //   search
              selection
              onChange={(event, data) =>
                handleChangeSemantic(data.value, "workingTime")
              }
              //onBlur={formik.onBlur}
              id="workingTime"
              value={formik.values.workingTime}
              options={workingTimeOptions}
            />
            {formik.errors.workingTime && formik.touched.workingTime && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.workingTime}
              </div>
            )}
          </Form.Field>
        </Menu.Item>
        <Menu.Item>
          <Form onSubmit={formik.handleSubmit}>
            <Button color="green" type="submit">
              Uygula
            </Button>
          </Form>
        </Menu.Item>
      </Menu>
    </div>
  );
}
