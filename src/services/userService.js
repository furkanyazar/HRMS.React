import axios from "axios";

export default class UserService {
  logInAdmin(values) {
    return axios.get(
      "http://localhost:8080/api/staffs/findbyemailandpassword?email=" +
        values.email +
        "&password=" +
        values.password
    );
  }

  logInEmployer(values) {
    return axios.get(
      "http://localhost:8080/api/activationemployers/findbyforlogin?email=" +
        values.email +
        "&isActivated=true&password=" +
        values.password
    );
  }

  logInUser(values) {
    return axios.get(
      "http://localhost:8080/api/employees/findbyemailandpassword?email=" +
        values.email +
        "&password=" +
        values.password
    );
  }

  addEmployer(values) {
    return axios.post("http://localhost:8080/api/employers/add", values);
  }

  setNewPassword(id, oldPassword, newPassword) {
    return axios.post(
      "http://localhost:8080/api/users/setnewpassword?id=" +
        id +
        "&newPassword=" +
        newPassword +
        "&oldPassword=" +
        oldPassword
    );
  }

  editAdmin(values, id) {
    return axios.post("http://localhost:8080/api/staffs/edit?id=" + id, values);
  }

  editEmployee(values, id, coverLetter, github, linkedin) {
    return axios.post(
      "http://localhost:8080/api/employees/edit?coverLetter=" +
        coverLetter +
        "&github=" +
        github +
        "&id=" +
        id +
        "&linkedin=" +
        linkedin,
      values
    );
  }

  editEmployer(values, id) {
    return axios.post(
      "http://localhost:8080/api/employers/edit?id=" + id,
      values
    );
  }

  addUser(values) {
    return axios.post("http://localhost:8080/api/employees/add", values);
  }

  getEmployerById(id) {
    return axios.get("http://localhost:8080/api/employers/findbyid?id=" + id);
  }

  getAdminById(id) {
    return axios.get("http://localhost:8080/api/staffs/findbyuserid?id=" + id);
  }

  getIsNotActiveEmployers() {
    return axios.get(
      "http://localhost:8080/api/activationemployers/getisactivated?isActivated=false"
    );
  }

  setIsActivated(id) {
    return axios.post(
      "http://localhost:8080/api/employers/setIsActivated?id=" +
        id +
        "&isActivated=true"
    );
  }

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
