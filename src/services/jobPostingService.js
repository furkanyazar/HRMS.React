import axios from "axios";

export default class JobPostingService {
  add(values) {
    return axios.post("http://localhost:8080/api/jobPostings/add", values);
  }
  
  setIsActivated(id) {
    return axios.post(
      "http://localhost:8080/api/jobPostings/setIsActivated?id=" +
        id +
        "&isActivated=true"
    );
  }

  getIsNotActiveJobPostings() {
    return axios.get(
      "http://localhost:8080/api/jobPostings/getByIsActivated?isActivated=false"
    );
  }

  getJobById(id) {
    return axios.get("http://localhost:8080/api/jobPostings/getById?id=" + id);
  }

  getJobPostings() {
    return axios.get(
      "http://localhost:8080/api/jobPostings/getByIsActivated?isActivated=true"
    );
  }

  getByIsActivatedAndUserId(id) {
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
