import React from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";

interface KeysetItemType {
  inputValue: string;
  title: string;
}

const filter = createFilterOptions<KeysetItemType>();

interface KeysetAutocompleteProps {
  onUpdate(value: string, isNew: boolean): void;
  value: string;
  options: KeysetItemType[];
}

export const KeysetAutocomplete: React.FC<KeysetAutocompleteProps> = ({
  onUpdate,
  value,
  options,
}) => {
  return (
    <Autocomplete
      size="medium"
      value={value}
      onChange={(_e, newValue) => {
        // Enter was pressed
        if (typeof newValue === "string") {
          onUpdate(newValue, true);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          onUpdate(newValue.inputValue, true);
        } else {
          onUpdate(newValue.inputValue, false);
        }
      }}
      placeholder="Select keyset"
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Keyset" />}
    />
  );
};