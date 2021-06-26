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
    return axios.get("http://localhost:8080/api/activationemployers/findbyforlogin?email=" + values.email + "&isActivated=true&password=" + values.password);
  }

  logInUser(values) {
    return axios.get("http://localhost:8080/api/employees/findbyemailandpassword?email=" + values.email + "&password=" + values.password);
  }

  addEmployer(values) {
    return axios.post("http://localhost:8080/api/employers/add", values);
  }

  addUser(values) {
    return axios.post("http://localhost:8080/api/employees/add", values);
  }

  getEmployerById(id) {
    return axios.get("http://localhost:8080/api/employers/findbyid?id=" + id);
  }

  getIsNotActiveEmployers() {
    return axios.get("http://localhost:8080/api/activationemployers/getisactivated?isActivated=false");
  }

  setIsActivated(id) {
    return axios.post("http://localhost:8080/api/employers/setIsActivated?id=" + id + "&isActivated=true");
  }
}
