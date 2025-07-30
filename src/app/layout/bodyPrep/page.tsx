"use client";

import { demoData } from "@/components/fakeData/layout/fakeData";
import BodyPrepLayout from "@/components/layout/BodyPrepLayout";

export default function BodyPrepLayoutPage() {
  return <BodyPrepLayout initialDevices={demoData.devices} />;
}