import React from "react";
import { Route } from "react-router";
import { Grid } from "semantic-ui-react";
import AddJob from "../pages/AddJob";
import AddLanguage from "../pages/AddLanguage";
import AddSchool from "../pages/AddSchool";
import AddSkill from "../pages/AddSkill";
import AdminDetail from "../pages/AdminDetail";
import AdminLogIn from "../pages/AdminLogIn";
import ConfirmAds from "../pages/ConfirmAds";
import ConfirmAdsDetail from "../pages/ConfirmAdsDetail";
import ConfirmEmployers from "../pages/ConfirmEmployers";
import ConfirmEmployersDetail from "../pages/ConfirmEmployersDetail";
import ConfirmEmployerUpdatesDetail from "../pages/ConfirmEmployerUpdatesDetail";
import ConfirmEmployerUpdates from "../pages/ConfirmEmployerUpdates";
import EditAdminDetail from "../pages/EditAdminDetail";
import EditAdminPassword from "../pages/EditAdminPassword";
import EditEmployerDetail from "../pages/EditEmployerDetail";
import EditEmployerPassword from "../pages/EditEmployerPassword";
import EditUserDetail from "../pages/EditUserDetail";
import EditUserPassword from "../pages/EditUserPassword";
import EmployerDetail from "../pages/EmployerDetail";
import EmployerLogIn from "../pages/EmployerLogIn";
import EmployerRegister from "../pages/EmployerRegister";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import UserDetail from "../pages/UserDetail";
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
          <Route exact path="/userdetail/:id" component={UserDetail} />
          <Route exact path="/edituserdetail/:id" component={EditUserDetail} />
          <Route exact path="/admindetail/:id" component={AdminDetail} />
          <Route exact path="/editemployerdetail/:id" component={EditEmployerDetail} />
          <Route exact path="/editadmindetail/:id" component={EditAdminDetail} />
          <Route exact path="/editadminpassword/:id" component={EditAdminPassword} />
          <Route exact path="/edituserpassword/:id" component={EditUserPassword} />
          <Route exact path="/editemployerpassword/:id" component={EditEmployerPassword} />
          <Route exact path="/addschool/:id" component={AddSchool} />
          <Route exact path="/addlanguage/:id" component={AddLanguage} />
          <Route exact path="/addskill/:id" component={AddSkill} />
          <Route exact path="/confirmemployerupdates" component={ConfirmEmployerUpdates} />
          <Route exact path="/confirmemployerupdatesdetail/:id" component={ConfirmEmployerUpdatesDetail} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
