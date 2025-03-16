"use client";

import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

const reportOptions = {
  0: ["گزارش بالمیل ۱", "گزارش بالمیل ۲", "گزارش بالمیل ۳"],
  1: ["گزارش فن اسپری ۱", "گزارش فن اسپری ۲"],
} as const;

export default function ReportsDropdown({
  selectedTab,
}: {
  selectedTab: keyof typeof reportOptions;  // Restrict selectedTab to valid keys
}) {
  const [selectedReport, setSelectedReport] = useState("انتخاب گزارش مورد نظر");

  return (
    <Select
      value={selectedReport}
      onChange={(e) => setSelectedReport(e.target.value)}
      className="mb-4"
      
    >
      <MenuItem value="" disabled>
        انتخاب گزارش مورد نظر
      </MenuItem>
      {reportOptions[selectedTab].map((report, index) => (
        <MenuItem key={index} value={report}>
          {report}
        </MenuItem>
      ))}
    </Select>
  );
}
