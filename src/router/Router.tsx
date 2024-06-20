import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
import { Dashboard } from "~/pages/Dashboard/Dashboard";
import { NewAdmission } from "~/pages/NewAdmission/NewAdmission";
import * as Styled from "./styles";

export const Router = () => {
  return (
    <Styled.Container>
      <HashRouter>
        <Switch>
          <Route exact path={routes.dashboard} component={Dashboard} />
          <Route exact path={routes.newAdmission} component={NewAdmission} />

          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </HashRouter>
    </Styled.Container>
  );
};
