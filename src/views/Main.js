import { MainRouter } from "../MainRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
function myFunction() {
  var element = document.getElementById("outer_wrapper");
  element.classList.toggle("dark-mode");
}
const Main = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        id="outer_wrapper"
        style={{
          minHeight: "100vh",
          overflow: "scroll",
          paddingBottom: "50px",
          position: "relative",
        }}
      >
        <Button
          sx={{
            position: "fixed",
            bottom: "25px",
            left: "20px",
            minWidth: "41px",
            color: "#fff",
            background: "dodgerblue",
            "&:hover": {
              background: "dodgerblue",
            },
          }}
          onClick={myFunction}
        >
          <NightsStayIcon sx={{ marginLeft: "10px" }} />
        </Button>
        <MainRouter />
      </div>
    </ThemeProvider>
  );
};

export default Main;
