import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import React, { FC } from "react";
import Gatsby from "./gatsby";
import GithubIcon from "./github-icon";
import Netlify from "./netlify";

const headerStyle: React.CSSProperties = {
  padding: "0 16px",
  height: "var(--header-height)",
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  position: "sticky",
  top: 0,
  backgroundColor: "#fff",
};

const buttonStyle: React.CSSProperties = {};

interface HeaderProps {}

const Header: FC<HeaderProps> = (pros) => {
  const { language, languages, changeLanguage } = useI18next();

  const handleChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value);
  };

  return (
    <div style={headerStyle}>
      <Gatsby />
      <Netlify />
      <div style={{ flex: 1, textAlign: "center" }}>
        <Trans i18nKey="title">Online Editor</Trans>
      </div>
      <Button
        size="small"
        variant="outlined"
        href={process.env.GATSBY_GITHUB_URL}
      >
        <GithubIcon />
      </Button>
      <Select
        size="small"
        value={language}
        onChange={handleChange}
        style={{ marginLeft: 16, height: 32 }}
      >
        {languages.map((lng) => (
          <MenuItem value={lng} key={lng}>
            {lng}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Header;
