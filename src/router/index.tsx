import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
 import { Dashboard } from "~/pages/Dashboard/Dashboard";
import { NewUser } from "~/pages/NewUser/NewUser";

export const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <HashRouter>
        <Switch>
          <Route exact path={routes.dashboard} component={Dashboard} />
          <Route exact path={routes.newUser} component={NewUser} />
          <Route
            exact
            path={routes.history}
            component={() => <div>History</div>}
          />

          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};
