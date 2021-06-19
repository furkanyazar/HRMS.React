import React from "react";
import { Route } from "react-router";
import { Grid } from "semantic-ui-react";
import JobList from "../pages/JobList";
import JobDetail from "../pages/JobDetail";
import EmployerDetail from "../pages/EmployerDetail";
import EmployeeDetail from "../pages/EmployeeDetail";
import Side from "./Side";
import Employers from "../pages/Employers";
import Employees from "../pages/Employees";
import NewJobPosting from "../pages/NewJobPosting";
import ActiveJobPosts from "../pages/ActiveJobPosts";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Column width={2}>
          <Side />
        </Grid.Column>
        <Grid.Column width={14}>
          <Route exact path="/" component={JobList} />
          <Route exact path="/jobdetail/:id" component={JobDetail} />
          <Route exact path="/employerdetail/:id" component={EmployerDetail} />
          <Route exact path="/employers" component={Employers} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employeedetail/:id" component={EmployeeDetail} />
          <Route exact path="/newjobposting" component={NewJobPosting} />
          <Route exact path="/activejobposts" component={ActiveJobPosts} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
