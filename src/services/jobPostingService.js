import axios from "axios";

export default class JobPostingService {
  add(values) {
    return axios.get("http://localhost:8080/api/jobPostings/add", values);
  }

  getJobPostings() {
    return axios.get("http://localhost:8080/api/jobPostings/getByIsActivated");
  }

  getJobById(id) {
    return axios.get("http://localhost:8080/api/jobPostings/getById?id=" + id);
  }

  getByIsActicatedAndUserId(id) {
    return axios.get(
      "http://localhost:8080/api/jobPostings/getByIsActivatedAndUserId?userId=" +
        id
    );
  }

  getAllCities() {
    return axios.get("http://localhost:8080/api/cities/getall");
  }

  getAllWorkplaces() {
    return axios.get("http://localhost:8080/api/workplaces/getall");
  }

  getAllWorkingTimes() {
    return axios.get("http://localhost:8080/api/workingTimes/getall");
  }

  getAllJobPositions() {
    return axios.get("http://localhost:8080/api/jobs/getall");
  }
}
