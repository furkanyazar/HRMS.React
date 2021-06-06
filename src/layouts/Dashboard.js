import React from "react";
import { Grid } from "semantic-ui-react";
import JobList from "../pages/JobList";
import Side from "./Side";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Column width={2}>
          <Side />
        </Grid.Column>
        <Grid.Column width={14}>
          <JobList />
        </Grid.Column>
      </Grid>
    </div>
  );
}
