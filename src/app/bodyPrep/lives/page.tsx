"use client";

import React from "react";
import { BodyPrepLiveProps } from "@/interfaces/user/general/productLinePart";
import MainCard from "@/components/customContiner/MainCard";
// import LiveCardManager from "@/components/liveCards/LiveCardManager";

export default function BodyPrepLive({ liveType, label, name }: BodyPrepLiveProps) {
  return (
    <MainCard>
      <div>
        <h2>{label}</h2>
        <p>Name: {name}</p>
        <p>Type: {liveType}</p>
      </div>
    </MainCard>
  );
}