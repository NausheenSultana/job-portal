import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Autocomplete from "@mui/material/Autocomplete";
import sharedStyles from "../styles/Styles";
import formStyle from "../styles/FormStyle";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import skills from "../skills.json";
import axios from "axios";
import job_posters from "../data/employers.json";
import AutocompleteComponent from "../components/AutocompleteComponent.js";

const AddJob = (props) => {
  const params = useParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  let jobPoster = job_posters.find((element) => element.pid === params.id);
  const [newJob, setNewJob] = useState({
    job_id: generateUniqueID(),
    job_title: "",
    description: "",
    requirements: "",
    skillset: [],
    salary: "",
    company: "",
    location: "",
    applied: [],
    contact: {
      pid: jobPoster.pid,
      name: jobPoster.name,
      email: jobPoster.email,
      phone: jobPoster.phone,
    },
  });
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  function generateUniqueID() {
    const timestamp = new Date().getTime();
    return timestamp;
  }

  const companies = [
    "TechCo Inc.",
    "WebTech Solutions",
    "Data Insights Corp.",
    "CreativeTech Studios",
    "TechAnalytics Corp.",
    "Digital Solutions Agency",
    "Design Innovations Studio",
    "Tech Innovators Ltd.",
    "ConnectX Networks",
    "CreativeWords Media",
    "FinancePro Group",
    "AppTech Solutions",
    "SalesGrowth Inc.",
  ];
  const places = [
    "San Francisco, CA",
    "Seattle, WA",
    "New York, NY",
    "Los Angeles, CA",
    "Austin, TX",
    "Dallas, TX",
    "San Jose, CA",
    "Denver, CO",
    "Chicago, IL",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    sendNewJob(newJob);
  };

  async function sendNewJob(newJobData) {
    try {
      const response = await axios.post(
        "http://localhost:8080/job/create",
        newJobData
      );

      if (response.status === 201) {
        setOpenSnackbar(true);
        setNewJob({
          job_id: generateUniqueID(),
          job_title: "",
          description: "",
          requirements: "",
          skillset: [],
          salary: "",
          company: "",
          location: "",
          applied: [],
          contact: {
            pid: jobPoster.pid,
            name: jobPoster.name,
            email: jobPoster.email,
            phone: jobPoster.phone,
          },
        });
      }
    } catch (error) {
      console.error("Error adding new job entry:", error);
    }
  }

  const handleChange = (value, key) => {
    setNewJob({
      ...newJob,
      [key]: value,
    });
    setTimeout(() => console.log(newJob), 500);
  };
  useEffect(() => {
    console.log(newJob);
  }, [newJob]);

  return (
    <>
      <Grid container justifyContent="center" sx={{ marginTop: "40px" }}>
        <Grid
          xs={7}
          md={5}
          sx={{
            marginRight: "16px",
            backgroundColor: "#dbe9fa",
            padding: "20px 0",
          }}
        >
          <Typography sx={{ textAlign: "center", ...sharedStyles.titleStyle }}>
            Add below the details of your new job post:
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: 4,
              alignItems: "center",
            }}
          >
            <FormControl sx={formStyle}>
              <TextField
                name={"title"}
                label="Job Title"
                required
                margin="normal"
                variant="standard"
                error={
                  newJob.job_title === "" ||
                  newJob.job_title === null ||
                  newJob.job_title.length < 5 ||
                  newJob.job_title.length > 50
                }
                helperText={
                  ((newJob.job_title === "" || newJob.job_title === null) &&
                    "Job title is required") ||
                  (newJob.job_title &&
                    (newJob.job_title.length < 5 ||
                      newJob.job_title.length > 50) &&
                    "Job title should be between 5 and 50 characters")
                }
                value={newJob.job_title}
                id="title-standard-required"
                onChange={(e) => handleChange(e.target.value, "job_title")}
                sx={{ marginRight: "60px" }}
              />
              <TextField
                name={"description"}
                //   defaultValue={form.pyramid}
                label="Job Description"
                value={newJob.description}
                required
                margin="normal"
                variant="outlined"
                error={
                  newJob.description === "" ||
                  newJob.description === null ||
                  newJob.description.length < 100 ||
                  newJob.description.length > 2000
                }
                helperText={
                  newJob.description === "" || newJob.description === null
                    ? "Job description is required"
                    : newJob.description.length < 100 ||
                      newJob.description.length > 2000
                    ? "Job description should be between 100 and 2000 characters"
                    : "Job description is valid"
                }
                id="pyramid-standard-required"
                onChange={(e) => handleChange(e.target.value, "description")}
                style={{ marginRight: "60px" }}
              />
              <TextField
                value={newJob.requirements}
                name={"requirement"}
                //   defaultValue={form.pyramid}
                label="Job Requirements"
                required
                margin="normal"
                variant="standard"
                error={
                  newJob.requirements === "" ||
                  newJob.requirements === null ||
                  newJob.requirements.length < 100 ||
                  newJob.requirements.length > 2000
                }
                helperText={
                  newJob.requirements === "" || newJob.requirements === null
                    ? "Job description is required"
                    : newJob.requirements.length < 100 ||
                      newJob.requirements.length > 2000
                    ? "Job requirements should be between 100 and 2000 characters"
                    : "Job requirements is valid"
                }
                id="pyramid-standard-required"
                onChange={(e) => handleChange(e.target.value, "requirements")}
                style={{ marginRight: "60px" }}
              />
              <TextField
                name={"salary"}
                value={newJob.salary}
                label="Salary range"
                required
                margin="normal"
                sx={{ marginTop: "20px" }}
                variant="standard"
                error={newJob.salary === "" || newJob.salary === null}
                helperText={
                  (newJob.salary === "" || newJob.salary === null) &&
                  "Mention salary in a range like $100 - $120"
                }
                id="title-standard-required"
                onChange={(e) => handleChange(e.target.value, "salary")}
                style={{ marginRight: "60px" }}
              />
              {/* <Autocomplete
                multiple
                id="tags-standard"
                value={newJob.skillset}
                options={skills}
                sx={{ marginTop: "20px", marginRight: "60px" }}
                getOptionLabel={(option) => option}
                onChange={handleInputChange("skillset")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={newJob.skillset === "" || newJob.skillset === null}
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
              /> */}
              <AutocompleteComponent
                multiple={true}
                value={newJob.skillset}
                options={skills}
                onChangeParameter="skillset"
                newJob={newJob}
                placeholder="Skillsets"
                label="Skills"
                setNewJob={setNewJob}
              />
              <AutocompleteComponent
                multiple={false}
                value={newJob.company}
                options={companies}
                onChangeParameter="company"
                newJob={newJob}
                label="Job company"
                setNewJob={setNewJob}
              />
              <AutocompleteComponent
                multiple={false}
                value={newJob.location}
                options={places}
                onChangeParameter="location"
                newJob={newJob}
                label="Job location"
                setNewJob={setNewJob}
              />
              {/* <Autocomplete
                sx={{ marginTop: "30px", marginRight: "60px" }}
                id="company-autocomplete"
                options={companies} // You should provide an array of place options here
                getOptionLabel={(option) => option}
                onChange={handleInputChange("company")}
                value={newJob.company}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={newJob.company === "" || newJob.company === null} // Set error state
                    helperText={
                      newJob.company === "" || newJob.company === null
                        ? "Company cannot be empty"
                        : ""
                    }
                    label="Job company"
                    variant="standard"
                    fullWidth
                  />
                )}
              /> */}
              {/* <Autocomplete
                sx={{ marginTop: "30px", marginRight: "60px" }}
                value={newJob.location}
                id="place-autocomplete"
                options={places} // You should provide an array of place options here
                getOptionLabel={(option) => option}
                onChange={handleInputChange("location")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={newJob.location === "" || newJob.location === null} // Set error state
                    helperText={
                      newJob.location === "" || newJob.location === null
                        ? "Location cannot be empty"
                        : ""
                    }
                    label="Job Location"
                    variant="standard"
                    fullWidth
                  />
                )}
              /> */}
              <Typography sx={{ marginTop: "30px", marginRight: "60px" }}>
                Contact Info:
              </Typography>
              <TextField
                label="Name"
                variant="standard"
                fullWidth
                value={jobPoster.name}
                // onChange={handleNameChange}
                // error={nameError}
                // helperText={nameError ? "Name is required" : ""}
              />
              <TextField
                sx={{ marginTop: "30px", marginRight: "60px" }}
                label="Email"
                variant="standard"
                fullWidth
                value={jobPoster.email}
                // onChange={handleEmailChange}
                // error={emailError}
                // helperText={emailError ? "Email is required" : ""}
              />
              <TextField
                sx={{ marginTop: "30px", marginRight: "60px" }}
                label="Phone Number"
                variant="standard"
                fullWidth
                value={jobPoster.phone}
                // onChange={handlePhoneChange}
                // error={phoneError}
                // helperText={phoneError ? "Phone number is required" : ""}
              />
            </FormControl>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "dodgerblue",
                width: "140px",
                m: 2,
              }}
              type={"submit"}
              endIcon={<ArrowForwardIosIcon />}
            >
              Submit
            </Button>
            <Typography sx={{ color: "grey" }}>
              <em>* Fields are mandatory.</em>
            </Typography>
          </form>
        </Grid>
        <Grid item md={2} xs={0} sx={{ marginRight: "16px" }}>
          <div style={{ ...sharedStyles.profileInnerStyle }}>
            <Typography
              sx={{ textAlign: "center", ...sharedStyles.titleStyle }}
            >
              Recruiter name: {jobPoster.name}
            </Typography>
            <Link
              to={`/post-job/${params.id}`}
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
          </div>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          sx={{ backgroundColor: "#007bff" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={handleSnackbarClose}
          >
            Job posted successfully!
          </MuiAlert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default AddJob;
