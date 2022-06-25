import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <p>Links area</p>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        {/*<p>Switch area</p>*/}
        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    console.log("fakeAuth.authenticate method activated");
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    console.log("fakeAuth.signout method activated");
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();
  console.log("AuthButton function activated.")
  return fakeAuth.isAuthenticated ? (
    <p>
      <b>--------------------------</b><br/>
      <b>AuthButton  called with fakeAuth.isAuthenticated=true</b><br />
      {console.log('AuthButton called with fakeAuth.isAuthenticated=true')}
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
        {console.log('AuthButton clicking [Sign Out] button will call fakeAuth.signout with cb as () => history.push("/");')}
      </button><br/>
      <b>--------------------------</b><br/>
    </p>
  ) : (
    <p>
      <b>--------------------------</b><br/>
      <b>AuthButton  called with fakeAuth.isAuthenticated=false</b><br />
      {console.log('AuthButton called with fakeAuth.isAuthenticated=false')}
      You are not logged in.<br/>
      <b>--------------------------</b><br/>
    </p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  console.log("Private Route function activated.");
  console.log("Private Route function children:");
  console.log(children);
  console.log("Private Route function ...rest:");
  console.log(rest);
  console.log("Private Route function rest.location:");
  console.log(rest.location);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  console.log("PublicPage function activated.")
  return (
    <p>
      <b>--------------------------</b><br/>
      Public page<br/>
      <b>--------------------------</b><br/>
    </p>
  );
}

function ProtectedPage() {
  console.log('ProtectedPage function activated')
  return (
    <p>
      <b>--------------------------</b><br/>
      Protected page<br/>
      <b>--------------------------</b><br/>
    </p>
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  console.log('LoginPage function activated.')
  console.log("LoginPage function location.state:");
  console.log(location.state);

  let { from } = location.state || { from: { pathname: "/" } };
  console.log("LoginPage function {from}:");
  console.log({from});
  let login = () => {
    console.log("fakeAuth.authenticate method called with cb as ()=>{history.replace(from);}");
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>
        <b>--------------------------</b><br/>
        <b>Login Page</b><br/>
        You must log in to view the page at {from.pathname}<br/>
      </p>
      <button onClick={login}>Log in</button><br/>
      <br/>
      <strong>--------------------------</strong><br/>
    </div>
  );
} // end of LoginPage()
