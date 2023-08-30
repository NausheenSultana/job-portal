import { Typography } from "@mui/material";
import sharedStyles from "../styles/Styles";

const Header = (_) => {
  return (
    <header>
      <nav style={{ ...sharedStyles.navStyle }}>
        <Typography
          sx={{
            marginLeft: "150px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "30px",
            fontStyle: "italic",
            "@media (max-width: 650px)": {
              fontSize: "25px",
            },
          }}
        >
          India's No.1 Job Site
        </Typography>
      </nav>
    </header>
  );
};

export default Header;
