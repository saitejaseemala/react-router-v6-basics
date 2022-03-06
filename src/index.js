import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
  NavLink,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<Param />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="hola" element={<Hola />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);

function Learn() {
  return (
    <div>
      <h1>Learn Everything</h1>
      <p>Always be curious</p>
      <Link to="/learn/courses" className="btn btn-primary">
        Courses
      </Link>{" "}
      |{" "}
      <Link to="/learn/bundles" className="btn btn-info">
        Bundles
      </Link>{" "}
      |{" "}
      <Link to="/" className="btn btn-warning">
        Home
      </Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const navigate = useNavigate();
  return (
    <div className="course">
      <h1>Courses</h1>
      <button
        className="btn btn-success"
        onClick={() => {
          navigate("/dashboard", { state: "Welcome To" });
        }}
      >
        Go To Dashboard
      </button>
      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div className="bundle">
      <h1>Bundles</h1>
    </div>
  );
}

function Param() {
  const { courseid } = useParams();
  return <h1>URL param is : {courseid}</h1>;
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>{location.state} Dashboard</h1>
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "red" : "coral",
          };
        }}
        to="/dashboard/hola"
      >
        Click Me
      </NavLink>
      <Outlet />
    </div>
  );
}

function Hola() {
  return <h1>Hola!!</h1>;
}
