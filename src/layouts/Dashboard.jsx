import React from "react";
import { Route } from "react-router";
import { Grid } from "semantic-ui-react";
import AddJob from "../pages/AddJob";
import AdminLogIn from "../pages/AdminLogIn";
import ConfirmAds from "../pages/ConfirmAds";
import ConfirmAdsDetail from "../pages/ConfirmAdsDetail";
import ConfirmEmployers from "../pages/ConfirmEmployers";
import ConfirmEmployersDetail from "../pages/ConfirmEmployersDetail";
import EmployerDetail from "../pages/EmployerDetail";
import EmployerLogIn from "../pages/EmployerLogIn";
import EmployerRegister from "../pages/EmployerRegister";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import UserLogIn from "../pages/UserLogIn";
import UserRegister from "../pages/UserRegister";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Column width={16}>
          <Route exact path="/" component={Home} />
          <Route exact path="/adminlogin" component={AdminLogIn} />
          <Route exact path="/employerlogin" component={EmployerLogIn} />
          <Route exact path="/employerregister" component={EmployerRegister} />
          <Route exact path="/userlogin" component={UserLogIn} />
          <Route exact path="/userregister" component={UserRegister} />
          <Route exact path="/confirmads" component={ConfirmAds} />
          <Route exact path="/confirmadsdetail/:id" component={ConfirmAdsDetail} />
          <Route exact path="/employerdetail/:id" component={EmployerDetail} />
          <Route exact path="/jobdetail/:id" component={JobDetail} />
          <Route exact path="/confirmemployers" component={ConfirmEmployers} />
          <Route exact path="/confirmemployersdetail/:id" component={ConfirmEmployersDetail} />
          <Route exact path="/addjob" component={AddJob} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
