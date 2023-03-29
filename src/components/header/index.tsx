import { Button } from "@mui/material";
import { Link, Trans, useI18next } from "gatsby-plugin-react-i18next";
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
  const { languages, originalPath, t, i18n } = useI18next();

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
      <ul className="languages">
        {languages.map((lng) => (
          <li key={lng}>
            <Link
              to={originalPath}
              language={lng}
              style={{
                textDecoration:
                  i18n.resolvedLanguage === lng ? "underline" : "none",
              }}
            >
              {lng}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
