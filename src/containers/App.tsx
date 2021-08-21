import React from "react";
import Teams from "../components/Teams";
import TeamMembers from "../components/TeamMembers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
