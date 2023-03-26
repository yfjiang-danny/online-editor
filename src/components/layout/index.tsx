import { ReactNode } from "@mdx-js/react/lib";
import React from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>Header</div>
      <main>{children}</main>
    </div>
  );
}
