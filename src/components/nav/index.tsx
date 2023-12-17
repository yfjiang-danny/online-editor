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
  target?: string;
}

interface NavProps {
  items: NavItemModel[];
}

const Nav: FC<NavProps> = ({ items }) => {
  const { language, defaultLanguage } = useI18next();

  const prefix = `/html/methodology`;
  const navList = [
    { route: `${prefix}/spring.html`, name: "春", target: "__blank" },
    { route: `${prefix}/spring_1.html`, name: "春1", target: "__blank" },
    { route: `${prefix}/summer.html`, name: "夏", target: "__blank" },
    { route: `${prefix}/autumn.html`, name: "秋", target: "__blank" },
    { route: `${prefix}/winter.html`, name: "冬", target: "__blank" },
    { route: `${prefix}/trend.html`, name: "趋势", target: "__blank" },
    { route: `${prefix}/summary.html`, name: "总结", target: "__blank" },
  ];

  return (
    <div className="nav" style={divStyle}>
      <MenuList>
        {items.map((v, i) => {
          return (
            <MenuItem key={v.route + i}>
              <Link
                to={
                  language != defaultLanguage
                    ? `/${language}${v.route}`
                    : `${v.route}`
                }
                style={{ display: "block", width: "100%" }}
                target={v.target}
              >
                <ListItemText>{v.name}</ListItemText>
              </Link>
            </MenuItem>
          );
        })}
        {navList.map((v, i) => {
          return (
            <MenuItem key={v.route + i}>
              <a
                href={`${v.route}`}
                style={{ display: "block", width: "100%" }}
                target={v.target}
              >
                <ListItemText>{v.name}</ListItemText>
              </a>
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
};

export default Nav;
