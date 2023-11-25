import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Apps,
  Calculate,
  ChatBubble,
  Folder,
  Info,
  Logout,
  Person,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { SigninPage } from "./components/Signin";
import { setGlobalState, useGlobalState } from "./components/context";
import logo from "./images/logo.png";

const SideBar_List = [
  {
    path: "/home",
    name: "Home",
    icon: <Apps />,
  },
  {
    path: "/calculators",
    name: "Calculator",
    icon: <Calculate />,
  },
  {
    path: "/chatbot",
    name: "Chatbot",
    icon: <ChatBubble />,
  },
  {
    path: "/KBMS",
    name: "FBMS",
    icon: <Folder />,
  },
  {
    path: "/users",
    name: "User",
    icon: <Person />,
  },
  {
    path: "/about",
    name: "About",
    icon: <Info />,
  },
];

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  marginBottom: "-50px",
}));

export default function PersistentDrawerLeft({ children }) {
  let navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, ms);
    });
  }

  async function logout() {
    setGlobalState("loading", true);
    await delay(1000);
    setGlobalState("loading", false);
    navigate("/signin");
    setGlobalState("auth", false);
  }

  const [auth] = useGlobalState("auth");

  return (
    <div>
      {auth ? (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Strata Matters Legal Chatbot
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    marginBottom: "30px",
                    width: "150px",
                    height: "150px",
                  }}
                />
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {SideBar_List.map((activity, index) => (
                  <ListItem
                    onClick={() => {
                      navigate(activity.path);
                    }}
                    components={Link}
                    key={activity.name}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>{activity.icon}</ListItemIcon>
                      <ListItemText primary={activity.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                <ListItem key="Logout" disablePadding onClick={logout}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Logout></Logout>
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Drawer>

            <Main open={open}>
              <DrawerHeader></DrawerHeader>
              <div style={{ marginLeft: "20px" }}>{children}</div>
            </Main>
          </Box>
        </>
      ) : (
        <>
          <SigninPage></SigninPage>
        </>
      )}
    </div>
  );
}
