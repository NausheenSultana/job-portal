import { useParams } from "react-router-dom";
import { Typography, Grid, Card } from "@mui/material";
import employees from "../data/freelancers.json";
import { Link } from "react-router-dom";

const FreelancerProfile = (_) => {
  const { aid, pid } = useParams();

  const profileData = employees.find((emp) => emp.employee_id === aid);

  if (!profileData) {
    return (
      <Typography variant="h6">Profile not found for ID: {aid}</Typography>
    );
  }

  // Define styles for the container card and the data displayed
  const cardStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const labelStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "left", // Align labels to the left
  };

  const dataStyle = {
    fontSize: "16px",
    color: "#555",
    textAlign: "left", // Align data to the left
  };

  return (
    <Grid container>
      <Grid md={7} sx={{ margin: "100px auto" }}>
        <Card className="job_card" style={cardStyle}>
          <Typography style={labelStyle}>Name:</Typography>
          <div style={dataStyle}>{profileData.name}</div>
          {profileData.skills && profileData.skills.length > 0 && (
            <div>
              <div style={labelStyle}>Skills:</div>
              <div style={dataStyle}>
                {profileData.skills.map((skill, index) => (
                  <div key={index}>{skill}</div>
                ))}
              </div>
            </div>
          )}
          <div style={labelStyle}>Current Salary:</div>
          <div style={dataStyle}>{profileData.salary}</div>
          <div style={labelStyle}>Current Location:</div>
          <div style={dataStyle}>{profileData.location}</div>
          <div style={labelStyle}>Total Experience:</div>
          <div style={dataStyle}>{profileData.experience}</div>
          <div style={labelStyle}>Phone:</div>
          <div style={dataStyle}>{profileData.phone_number}</div>
          <div style={labelStyle}>Email:</div>
          <div style={dataStyle}>{profileData.email_id}</div>
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
