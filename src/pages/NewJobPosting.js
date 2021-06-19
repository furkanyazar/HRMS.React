import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";

export default function NewJobPosting() {
  const [cities, setCities] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);

  useEffect(() => {
    let jobPostingService = new JobPostingService();

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

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input fluid label="Maaş aralığı" placeholder="Maaş aralığı" />
          <Form.Select
            fluid
            label="Açık Pozisyon"
            options={jobOptions}
            placeholder="Açık Pozisyon"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            type="date"
            fluid
            label="Son başvuru tarihi"
            placeholder="Son başvuru tarihi"
          />
          <Form.Select
            fluid
            label="Şehir"
            options={cityOptions}
            placeholder="Şehir"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Çalışma şekli"
            options={workplaceOptions}
            placeholder="Çalışma şekli"
          />
          <Form.Select
            fluid
            label="Çalışma zamanı"
            options={workingTimeOptions}
            placeholder="Çalışma zamanı"
          />
        </Form.Group>
        <Form.TextArea label="Açıklama" placeholder="İş ilanı açıklaması" />
        <Button type="submit">Gönder</Button>
      </Form>
    </div>
  );
}
