import React from "react";
import Teams from "../components/Teams";
import TeamMembers from "../components/TeamMembers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/teamMembers/:id" children={<TeamMembers />} />
        <Route path="/">
          <Teams />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
