import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import EmployeeService from "../services/employeeService";
import { formatDate } from '../functions';

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let employeeService = new EmployeeService();
    employeeService
      .getEmployees()
      .then((result) => setEmployees(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group>
        {employees.map((employee) => (
          <Card key={employee.id} fluid>
            <Card.Content>
              <Card.Header>
                {employee.name + " " + employee.surname}
              </Card.Header>
              <Card.Meta>{formatDate(employee.dateOfBirth)}</Card.Meta>
              <Card.Description>{employee.email}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  as={Link}
                  to={"/employeedetail/" + employee.id}
                >
                  Cv Gör
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
