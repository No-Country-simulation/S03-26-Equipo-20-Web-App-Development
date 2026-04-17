import React from "react";
import { OwnerProvider } from "../context/owner/OwnerContext";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OwnerProvider>
      <div>{children}</div>
    </OwnerProvider>
  );
}
