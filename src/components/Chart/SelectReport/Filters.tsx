import React from "react";
import { Box, Button } from "@mui/material";
import RangeDropdown from "../../FiltersReportDropDown/Range";
import OneDayDropdown from "@/components/FiltersReportDropDown/OneDay";
import { DateObject } from "react-multi-date-picker";
import SingleSelect from "../../FiltersReportDropDown/SingleSelect";
import MultiSelect from "../../FiltersReportDropDown/MultiSelect";
import SubRange from "../../FiltersReportDropDown/SubRange";
import { DynamicFiltersProps } from "../DynamicFilters";

const Filters: React.FC<DynamicFiltersProps> = ({
  filters,
  onChange,
  onSearch,
  dropdownTypes,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
        gap: 2,
        p: 2,
        borderRadius: 2,
      }}
    >
      {dropdownTypes.includes("range") && (
        <RangeDropdown
          value={filters.timeRange}
          onChange={(value: DateObject[]) => onChange("timeRange", value)}
        />
      )}

      {dropdownTypes.includes("oneDay") && (
        <OneDayDropdown
          value={filters.oneDay}
          onChange={(value: DateObject) => onChange("oneDay", value)}
        />
      )}

      {dropdownTypes.includes("singleSelect") && (
        <SingleSelect
          value={filters.singleSelect.value}
          placeholder={filters.singleSelect.placeholder}
          options={filters.singleSelect.options}
          onChange={(newValue: any) =>
            onChange("singleSelect", {
              ...filters.singleSelect,
              value: newValue,
            })
          }
        />
      )}

      {dropdownTypes.includes("multiSelect") && (
        <MultiSelect
          placeholder={filters.multiSelect.placeholder}
          options={filters.multiSelect.options}
          value={filters.multiSelect.value}
          onChange={(newValue: any) =>
            onChange("multiSelect", {
              ...filters.multiSelect,
              value: newValue,
            })
          }
        />
      )}

      {dropdownTypes.includes("subRange") && (
        <SubRange
          options={filters.subRange}
          onChange={(value: string) => onChange("subRange", [value])}
        />
      )}

      <Box>
        <Button variant="contained" fullWidth onClick={onSearch}>
          جست‌وجو
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
