"use client"

import MainCard from "@/components/customContiner/MainCard";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const UserPanel = ({ children }: Props) => {
  return <MainCard>{children}</MainCard>;
};

export default UserPanel;
