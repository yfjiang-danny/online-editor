import { ReactNode } from "@mdx-js/react/lib";
import React from "react";
import { PageContext } from "../../templates";
import Header from "../header";
import Nav from "../nav";

const wrapperStyle: React.CSSProperties = {
  display: "flex",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  paddingLeft: "var(--nav-width)",
  paddingRight: "var(--nav-width)",
};

interface LayoutProps {
  children: ReactNode;
  pageContext: PageContext;
}

export default function Layout({ children, pageContext }: LayoutProps) {
  return (
    <div>
      <Header />
      <div style={wrapperStyle}>
        <Nav items={pageContext.navList || []} />
        <main style={mainStyle}>{children}</main>
      </div>
    </div>
  );
}
