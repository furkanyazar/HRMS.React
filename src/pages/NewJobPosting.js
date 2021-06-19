import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Dropdown,
  Grid,
  Input,
  TextArea,
  Card,
} from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export default function NewJobPosting() {
  let jobPostingService = new JobPostingService();

  const jobPostingSchema = Yup.object().shape({
    lastDate: Yup.date()
      .nullable()
      .required("Bu alanın doldurulması zorunludur"),
    description: Yup.string().required("Bu alanın doldurulması zorunludur"),
    job: Yup.string().required("Bu alanın doldurulması zorunludur"),
    workingTime: Yup.string().required("Bu alanın doldurulması zorunludur"),
    workplace: Yup.string().required("Bu alanın doldurulması zorunludur"),
    openPosition: Yup.string()
      .required("Posizyon sayısı zorunludur")
      .min(1, "Posizyon sayısı 1 den küçük olamaz"),
    city: Yup.string().required("Bu alanın doldurulması zorunludur"),
    salaryRange: Yup.string().required("Bu alanın doldurulması zorunludur"),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      description: "",
      job: "",
      workingTime: "",
      workplace: "",
      openPosition: "",
      city: "",
      salaryRange: "",
      lastDate: "",
    },
    validationSchema: jobPostingSchema,
    onSubmit: (values) => {
      let postModel = {
        user: { id: 1 },
        city: { id: values.city },
        job: { id: values.job },
        workingTime: { id: values.workingTime },
        workplace: { id: values.workplace },
        description: values.description,
        openPosition: values.openPosition,
        salaryRange: values.salaryRange,
        lastDate: values.lastDate,
        isActivated: false,
      }
      jobPostingService
        .add(postModel)
        .then((result) => console.log(result.data.data));
      alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
      history.push("/");
    },
  });

  const [cities, setCities] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);

  useEffect(() => {
    jobPostingService
      .getAllCities()
      .then((result) => setCities(result.data.data));

    jobPostingService
      .getAllJobPositions()
      .then((result) => setJobs(result.data.data));

    jobPostingService
      .getAllWorkingTimes()
      .then((result) => setWorkingTimes(result.data.data));

    jobPostingService
      .getAllWorkplaces()
      .then((result) => setWorkplaces(result.data.data));
  });

  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));

  const jobOptions = jobs.map((jobOption, index) => ({
    key: index,
    text: jobOption.name,
    value: jobOption.id,
  }));

  const workingTimeOptions = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.name,
    value: workingTime.id,
  }));

  const workplaceOptions = workplaces.map((workplace, index) => ({
    key: index,
    text: workplace.name,
    value: workplace.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content header="İş ilanı Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field style={{ marginBottom: "1rem" }}>
              <label>İş Posisyonu</label>
              <Dropdown
                clearable
                item
                placeholder="İş pozisyonu"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "job")
                }
                onBlur={formik.onBlur}
                id="job"
                value={formik.values.job}
                options={jobOptions}
              />
              {formik.errors.job && formik.touched.job && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.job}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Şehir</label>
              <Dropdown
                clearable
                item
                placeholder="Şehir"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "city")
                }
                onBlur={formik.onBlur}
                id="city"
                value={formik.values.city}
                options={cityOptions}
              />
              {formik.errors.city && formik.touched.city && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.city}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Çalışma yeri</label>
              <Dropdown
                clearable
                item
                placeholder="Çalışma yeri"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "workplace")
                }
                onBlur={formik.onBlur}
                id="workplace"
                value={formik.values.workplace}
                options={workplaceOptions}
              />
              {formik.errors.workplace && formik.touched.workplace && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.workplace}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Çalışma Süresi</label>
              <Dropdown
                clearable
                item
                placeholder="Çalışma Süresi"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "workingTime")
                }
                onBlur={formik.onBlur}
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
            <Form.Field>
              <Grid stackable>
                <Grid.Column width={16}>
                  <label style={{ fontWeight: "bold" }}>Maaş aralığı</label>
                  <Input
                    type="text"
                    placeholder="Maaş aralığı"
                    value={formik.values.salaryRange}
                    name="salaryRange"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Input>
                  {formik.errors.salaryRange && formik.touched.salaryRange && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.salaryRange}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Açık Posisyon sayısı
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    id="openPosition"
                    name="openPosition"
                    error={Boolean(formik.errors.openPosition)}
                    onChange={formik.handleChange}
                    value={formik.values.openPosition}
                    onBlur={formik.handleBlur}
                    type="number"
                    placeholder="Açık Posisyon sayısı"
                  />
                  {formik.errors.openPosition &&
                    formik.touched.openPosition && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.openPosition}
                      </div>
                    )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Son başvuru tarihi
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.lastDate)}
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "lastDate")
                    }
                    value={formik.values.lastDate}
                    onBlur={formik.handleBlur}
                    name="lastDate"
                    placeholder="Son başvuru tarihi"
                  />
                  {formik.errors.lastDate && formik.touched.lastDate && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.lastDate}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <label>Açıklama</label>
              <TextArea
                placeholder="Açıklama"
                style={{ minHeight: 100 }}
                error={Boolean(formik.errors.description).toString()}
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.description}
                </div>
              )}
            </Form.Field>
            <Button
              content="Ekle"
              labelPosition="right"
              icon="add"
              positive
              type="submit"
            />
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
