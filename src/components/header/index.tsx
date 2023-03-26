import { Button } from "@mui/material";
import React from "react";
import { FC } from "react";
import Gatsby from "./gatsby";
import GithubIcon from "./github-icon";
import Netlify from "./netlify";

const headerStyle: React.CSSProperties = {
  padding: "0 16px",
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  position: "sticky",
  top: 0,
};

const buttonStyle: React.CSSProperties = {};

interface HeaderProps {}

const Header: FC<HeaderProps> = (pros) => {
  return (
    <div style={headerStyle}>
      <Gatsby />
      <Netlify />
      <div style={{ flex: 1 }} />
      <Button
        size="small"
        variant="outlined"
        href={process.env.GATSBY_GITHUB_URL}
      >
        <GithubIcon />
      </Button>
    </div>
  );
};

export default Header;
