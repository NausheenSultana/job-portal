const formStyle = {
  m: 2,
  "@media (min-width: 1500px)": {
    width: 600,
  },
  "&:hover .MuiOutlinedInput-input": {
    color: "#333",
  },
  "&:hover .MuiInputLabel-root": {
    color: "#777",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "purple",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "333",
  },
  "& .MuiInputLabel .Mui-error": {
    color: "#999 !important",
  },
  "& .MuiInputLabel-root": {
    color: "#999",
    "&: .Mui-focused": {
      color: "#333",
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "purple",
  },
  "&:hover .MuiInputLabel-root p": {
    color: "gold",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline p .MuiTypography-root .MuiTypography-body1":
    {
      color: "gold",
    },
};
export default formStyle;
