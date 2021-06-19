import axios from "axios";

export default class EmployerService {
  getEmployerById(id) {
    return axios.get("http://localhost:8080/api/employers/findbyid?id=" + id);
  }

  getEmployers() {
    return axios.get("http://localhost:8080/api/employers/getall");
  }
}
