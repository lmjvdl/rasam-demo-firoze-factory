import { ReactNode } from "react";
import MaterialProvider from "./MaterialProvider";

const Providers = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <MaterialProvider>{children}</MaterialProvider>;
    </>
  );
};

export default Providers;
