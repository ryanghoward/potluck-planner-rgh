import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Create Event",
    href: "/createevent",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
  {
    label: "Log In",
    href: "/login",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#fff",
    paddingRight: "5rem",
    paddingLeft: "3.125rem",
    "@media (max-width: 1030px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Kaushan Script, cursive",
    // fontFamily: "IM Fell English SC', serif",
    fontWeight: 600,
    color: "#540804",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Antic, sans-serif",
    fontWeight: 700,
    color: "#540804",
    size: "1.25rem",
    marginLeft: "2.5rem",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "1.25rem 1.875rem",
  },
}));

const Navbar = () => {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1000
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {potluckPlannerLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const openDrawer = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const closeDrawer = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: openDrawer,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: closeDrawer,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>{potluckPlannerLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const potluckPlannerLogo = (
    <Typography variant='h6' component='h1' className={logo}>
      Potluck Planner
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Navbar;
