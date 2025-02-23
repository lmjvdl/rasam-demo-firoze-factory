import { FC, ReactNode, SyntheticEvent } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { AdvanceAutoCompleteProps, CustomPaperProps } from "@/interfaces/UI/inputs/DynamicInputs";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;


const AdvanceAutoComplete = ({
  multiple = false,
  TFPlaceholder = "فلان",
  TFLabel = "انتخاب " + TFPlaceholder,
  limitTags = 2,
  label = "user",
  uniqeProperty = "id",
  value,
  setValue,
  stateOption,
  extraComponents,
  selectAllEnabled = true,
  size = "small",
}: // value,onAddItem
// setValue,

AdvanceAutoCompleteProps) => {
  const allIsSelected =
    value?.length === stateOption?.length && value?.length > 0;
  const noSelected =value? value?.length === 0:true;
  const indeterminateActive = !allIsSelected && !noSelected;
  const handleSelectAllCheckBox = () => {
    if (multiple) {
      if (allIsSelected) {
        setValue([]);
      } else {
        setValue([...stateOption]);
      }
    }
  };
  const handleChange = (
    event: SyntheticEvent,
    newValue: any,
    reason: any,
    detail: any
  ) => {
    event.preventDefault();
    if (typeof newValue === "object") {
      setValue(newValue);
    } else {
      if (newValue === null) {
        // setValue(null);
      }
    }
  };
  const renderOption = (props: any, option: any, state: any) => {
    const { key, ...restProps } = props;
    return (
      <MenuItem key={key} {...restProps}>
        {multiple && (
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={state.selected}
          />
        )}
        {getOptionLabel(option)}
      </MenuItem>
    );
  };
  const isObject = (val: any) => {
    if (typeof val === "object") {
      return true;
    } else return false;
  };
  const getOptionLabel = (option: any) => {
    if (isObject(option)) {
      return option?.[label];
    } else {
      return option;
    }
  };

  const isOptionEqualToValue = (options: any, value: any) => {
    if (isObject(value)) {
      return options[uniqeProperty] == value[uniqeProperty];
    } else {
      return options == value;
    }
  };
  return (
    <>
      <Autocomplete
        onChange={handleChange}
        size={size}
        multiple={multiple}
        options={stateOption}
        value={value}
        disableCloseOnSelect={multiple}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        limitTags={limitTags}
        selectOnFocus
        clearOnBlur
        fullWidth
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField {...params} label={TFLabel} placeholder={TFPlaceholder} />
        )}
        slots={{
          paper: (props) => (
            <CustomPaperComponent
              props={props}
              allIsSelected={allIsSelected}
              indeterminateActive={indeterminateActive}
              handleSelectAllCheckBox={handleSelectAllCheckBox}
              multiple={multiple}
              extraComponents={extraComponents}
              selectAllEnabled={selectAllEnabled}
            />
          ),
        }}
      />
    </>
  );
};

const CustomPaperComponent: FC<CustomPaperProps> = ({
  props,
  allIsSelected,
  indeterminateActive,
  handleSelectAllCheckBox,
  multiple,
  extraComponents,
  selectAllEnabled,
}) => (
  <Paper {...props} onMouseDown={(e) => e.preventDefault()}>
    {multiple && selectAllEnabled && (
      <Stack>
        <FormControlLabel
          sx={{ p: 0, mx: 2.5 }}
          control={
            <Checkbox
              indeterminate={indeterminateActive}
              checked={allIsSelected}
              onChange={(e) => {
                e.preventDefault();
                handleSelectAllCheckBox();
              }}
            />
          }
          label="انتخاب همه"
        />
        <Divider />
      </Stack>
    )}
    {props.children}
    {extraComponents && (
      <>
        <Divider />
        {extraComponents}
      </>
    )}
  </Paper>
);

export default AdvanceAutoComplete;
