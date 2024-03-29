import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import NavBar from "components/layouts/NavBar";
// import Drawer from './components/layouts/Drawer';

import "../src/index.css";

// import purple from '@material-ui/core/colors/purple';
// Redux
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import Loader from "./components/UI/Loader";

import ProtectedRoute from "./components/common/ProtectedRoute";
import { routes } from "./routes";

import purple from "@material-ui/core/colors/purple";

import Login from "components/layouts/Login";
import NotFound from "components/layouts/PageNotFound";
import PermissionDenied from "components/layouts/PermissionDenied";
import SignUp from "components/layouts/SignUp";
import ForgotPassword from "components/layouts/ForgotPassword";
import Auth from "components/common/Auth";



const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    secondary: {
      main: purple[500],
    },
  },
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: "#db3131",
        "&$error": {
          color: "#db3131",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  self: {
    backgroundColor: "blue",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App(props) {
  const classes = useStyles();

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={lightTheme}>
        <div className={classes.root}>
          <NavBar {...props}> </NavBar>

          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <Auth>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route
                    path="/permission-denied"
                    element={<PermissionDenied />}
                  />
                  ​
                  {routes.map(({ element, path, name }) => (
                    <Route
                      key={name}
                      path={path}
                      element={<ProtectedRoute element={element} />}
                    />
                  ))}
                  ​<Route component={NotFound}></Route>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/passwordhelp" element={<ForgotPassword />} />
                </Routes>
              </BrowserRouter>
            </Auth>
          </Suspense>
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
// point to dev
