import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const drawerWidth = 220;

const navItems = [
  { label: "Home", to: "/", icon: <HomeIcon />, end: true },
  { label: "Sales", to: "/sales", icon: <BarChartIcon />, end: false },
  { label: "Retailers", to: "/retailers", icon: <StorefrontIcon />, end: false },
  { label: "Brands", to: "/brands", icon: <LocalOfferIcon />, end: false },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1f2733",
          color: "#cfd8e3",
        },
      }}
    >
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
          Dashboard
        </Typography>
      </Toolbar>
      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            end={item.end}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: "inherit",
              "&.active": {
                bgcolor: "#1976d2",
                color: "#fff",
              },
              "&.active .MuiListItemIcon-root": {
                color: "#fff",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
