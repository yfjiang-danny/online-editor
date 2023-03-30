import { ListItemText, MenuItem, MenuList } from "@mui/material";
import { Link } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import React, { FC } from "react";

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
  console.log("items", items);

  const { language } = useI18next();

  return (
    <div className="nav" style={divStyle}>
      <MenuList>
        {items.map((v, i) => {
          return (
            <MenuItem key={i}>
              <Link
                to={`/${language}${v.route}`}
                style={{ display: "block", width: "100%" }}
              >
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
