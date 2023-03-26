import { ListItemText, MenuItem, MenuList, styled } from "@mui/material";
import { Link } from "gatsby";
import React from "react";
import { FC } from "react";

const divStyle: React.CSSProperties = {
  position: "fixed",
  top: "var(--header-height)",
  bottom: 0,
  left: 0,
  width: "var(--nav-width)",
};

export interface NavItemModel {
  route: string;
  name: string;
}

interface NavProps {
  items: NavItemModel[];
}

const Nav: FC<NavProps> = ({ items }) => {
  return (
    <div className="nav" style={divStyle}>
      <MenuList>
        {items.map((v, i) => {
          return (
            <MenuItem key={i}>
              <Link to={v.route}>
                <ListItemText>{v.name}</ListItemText>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
};

export default Nav;
