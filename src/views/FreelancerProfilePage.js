import { useParams } from "react-router-dom";
import { Typography, Grid, Card } from "@mui/material";
import employees from "../data/freelancers.json";
import { Link } from "react-router-dom";
import sharedStyles from "../styles/Styles";

const FreelancerProfile = (_) => {
  const { aid, pid } = useParams();

  const profileData = employees.find((emp) => emp.employee_id === aid);

  if (!profileData) {
    return (
      <Typography variant="h6">Profile not found for ID: {aid}</Typography>
    );
  }

  return (
    <Grid container>
      <Grid md={7} sx={{ margin: "100px auto" }}>
        <Card sx={sharedStyles.cardStyle}>
          <Typography sx={sharedStyles.labelStyle}>Name:</Typography>
          <div style={sharedStyles.dataStyle}>{profileData.name}</div>
          {profileData.skills && profileData.skills.length > 0 && (
            <div>
              <div style={sharedStyles.labelStyle}>Skills:</div>
              <div style={sharedStyles.dataStyle}>
                {profileData.skills.map((skill, index) => (
                  <div key={index}>{skill}</div>
                ))}
              </div>
            </div>
          )}
          <div style={sharedStyles.labelStyle}>Current Salary:</div>
          <div style={sharedStyles.dataStyle}>{profileData.salary}</div>
          <div style={sharedStyles.labelStyle}>Current Location:</div>
          <div style={sharedStyles.dataStyle}>{profileData.location}</div>
          <div style={sharedStyles.labelStyle}>Total Experience:</div>
          <div style={sharedStyles.dataStyle}>{profileData.experience}</div>
          <div style={sharedStyles.labelStyle}>Phone:</div>
          <div style={sharedStyles.dataStyle}>{profileData.phone_number}</div>
          <div style={sharedStyles.labelStyle}>Email:</div>
          <div style={sharedStyles.dataStyle}>{profileData.email_id}</div>
        </Card>
        <Link
          to={`/post-job/${pid}`}
          style={{
            color: "#007bff",
            listStyleType: "none",
            textDecoration: "none",
            transition: "color 0.3s",
            "&:hover": {
              color: "#333",
            },
          }}
        >
          Back to my Job list
        </Link>
      </Grid>
    </Grid>
  );
};

export default FreelancerProfile;
