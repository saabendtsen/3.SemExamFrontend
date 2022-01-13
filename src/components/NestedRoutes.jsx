import "../css/style2.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import HomeNested from "./HomeNested";
import AdminManger from "./AdminManager";
import GetCatFacts from "./GetCatFacts";
import GetBTCPrice from "./GetBTCPrice";
import BuyCoins from "./BuyCoins"
import MyBoats from "./MyBoats";

export default function Nesting(props) {
  let userrole = props.userrole;
  return (
    <Router>
      <div>
        <Header userrole={userrole} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/catfacts">
              <GetCatFacts />
            </Route>
            {userrole === "user" && (
            <Route path="/myboats">
              <MyBoats />
            </Route>
            )}
            <Route path="/btcprice">
              <GetBTCPrice />
            </Route>
            <Route path="/buycoins">
              <BuyCoins />
            </Route>
            {userrole === "admin" && (
              <Route path="/admin">
                <AdminManger />
              </Route>
            )}
            {userrole === "admin" && (
              <Route path="/newautions">
                <Topics />
              </Route>
            )}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const Header = (props) => {
  let userrole = props.userrole;
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="selected" to="/">
          Home
        </NavLink>
      </li>
      {userrole === "user" && (
      <li>
        <NavLink activeClassName="selected" to="/myboats">
          My Boats
        </NavLink>
      </li>
      )}

      {userrole === "admin" && (
        <li>
          <NavLink activeClassName="selected" to="/newautions">
            New Aution
          </NavLink>
        </li>
      )}
      {userrole === "admin" && (
        <li>
          <NavLink activeClassName="selected" to="/admin">
            Admin
          </NavLink>
        </li>
      )}
    </ul>
  );
};

function Home() {
  return (
    <div>
      <HomeNested />
    </div>
  );
}

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
