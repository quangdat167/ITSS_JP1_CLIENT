import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import RouteConfig from "routes/Route";
import { useEffect, useState } from "react";

const drawerWidth = 240;

const listItem = [
    {
        icon: <HomeIcon />,
        text: "Home",
        route: RouteConfig.HOME,
    },
    {
        icon: <DashboardIcon />,
        text: "Dashboard",
        route: RouteConfig.DASHBOARD,
    },
    {
        icon: <CalendarMonthIcon />,
        text: "Calendar",
        route: RouteConfig.CALENDAR,
    },
    {
        icon: <FormatListNumberedIcon />,
        text: "My task",
        route: RouteConfig.MY_TASK,
    },
    {
        icon: <WorkspacesIcon />,
        text: "Workspace",
        route: RouteConfig.WORKSPACE,
    },
];

function DrawerLeft() {
    const [path, setPath] = useState("");
    const changeScreen = (item: any) => {
        window.location.href = item.route;
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            setPath(window.location.pathname);
        }
    }, []);
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    top: 56,
                },
                "& .MuiToolbar-root": {
                    height: 0,
                    minHeight: 0,
                },
                // "& .Mui-selected": {
                //     backgroundColor: "#2f6dbf",
                // },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <List>
                {listItem.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={(e) => changeScreen(item)}
                            selected={path === item.route}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
}

export default DrawerLeft;
