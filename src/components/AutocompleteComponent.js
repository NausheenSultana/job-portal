import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutocompleteComponent = ({
  multiple,
  value,
  options,
  onChangeParameter,
  newJob,
  label,
  setNewJob,
}) => {
  const handleInputChange = (fieldName) => (event, newInputValue) => {
    setNewJob((prevJob) => ({
      ...prevJob,
      [fieldName]: newInputValue,
    }));
  };
  return (
    <Autocomplete
      sx={{ marginTop: "20px", marginRight: "60px" }}
      multiple={multiple}
      id="tags-standard"
      value={value}
      options={options}
      getOptionLabel={(option) => option}
      onChange={handleInputChange(`${onChangeParameter}`)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={value === "" || value === null} // Set error state
          helperText={
            value === "" || value === null ? `${label} cannot be empty` : ""
          }
          variant="standard"
          label={label}
        />
      )}
    />
  );
};
export default AutocompleteComponent;
