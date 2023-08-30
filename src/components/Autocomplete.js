import Autocomplete from "@mui/material/Autocomplete";

const AutocompleteComponent = ({
  multiple,
  id,
  value,
  options,
  onChangeParameter,
  label,
  placeholder,
}) => {
  return (
    <Autocomplete
      multiple={multiple}
      id="tags-standard"
      value={newJob.skillset}
      options={skills}
      sx={{ marginTop: "20px", marginRight: "60px" }}
      getOptionLabel={(option) => option}
      onChange={handleInputChange("skillset")}
      renderInput={(params) => (
        <TextField
          {...params}
          error={newJob.skillset === "" || newJob.skillset === null} // Set error state
          helperText={
            newJob.skillset === "" || newJob.skillset === null
              ? "Skills cannot be empty"
              : ""
          }
          variant="standard"
          label="Skills"
          placeholder="Skillsets"
        />
      )}
    />
  );
};
export default AutocompleteComponent;
