import axios from "axios";

export default class EmployerService {
  getEmployees() {
    return axios.get("http://localhost:8080/api/employees/getall");
  }

  getEmployeeById(id) {
    return axios.get("http://localhost:8080/api/employees/findbyid?id=" + id);
  }

  getSchoolsByUser(id) {
    return axios.get(
      "http://localhost:8080/api/educations/findByUserId?userId=" + id
    );
  }

  getLanguagesByUser(id) {
    return axios.get(
      "http://localhost:8080/api/knownlanguages/findByUserId?userId=" + id
    );
  }

  getSkillsByUser(id) {
    return axios.get(
      "http://localhost:8080/api/ownedskills/findByUserId?userId=" + id
    );
  }

  getGithubByUser(id) {
    return axios.get(
      "http://localhost:8080/api/githubs/findByUserId?userId=" + id
    );
  }

  getLinkedinByUser(id) {
    return axios.get(
      "http://localhost:8080/api/linkedins/findByUserId?userId=" + id
    );
  }

  getCoverLetterByUser(id) {
    return axios.get(
      "http://localhost:8080/api/coverletters/findByUserId?userId=" + id
    );
  }

  getPhotosByUser(id) {
    return axios.get(
      "http://localhost:8080/api/photos/findByUserId?userId=" + id
    );
  }
}
