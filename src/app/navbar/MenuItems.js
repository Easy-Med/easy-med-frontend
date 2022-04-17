import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const MenuItems = ({ open, role, itemsArray, ...props }) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (menuItem) => {
    navigate(`/${role.toLowerCase()}/${menuItem.link}`);
  };

  return (
    <div>
      {itemsArray.map((items, index) => (
        <div key={index}>
          <List>
            {items.map((menuItem) => (
              <ListItemButton
                key={menuItem.name}
                onClick={() => handleMenuItemClick(menuItem)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menuItem.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </div>
  );
};

MenuItems.propTypes = {
  open: PropTypes.bool.isRequired,
  itemsArray: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
        icon: PropTypes.element,
      })
    )
  ).isRequired,
};

export default MenuItems;