import { useEffect, useState } from "react";
import Face2Icon from "@mui/icons-material/Face2";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import sharedStyles from "../styles/Styles";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import employees from "../data/freelancers.json";
import formStyle from "../styles/FormStyle";

const SearcherProfile = (props) => {
  const params = useParams();
  const [gitProfile, setGitProfile] = useState("");
  const [repositories, setRepositories] = useState([]);
  const profileData = employees.find((emp) => emp.employee_id === params.id);
  const handleGitProfileChange = (event) => {
    setGitProfile(event.target.value);
  };
  const [profile, setProfile] = useState({
    name: "",
    headline: "",
    git_link: "",
    experience: "",
    skills: [""],
  });
  useEffect(() => {
    if (profileData.git_url) {
      const parts = profileData.git_url.split("/");
      const username = parts[3];
      //eg: https://github.com/barchart
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
          setRepositories(data);
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
          setRepositories([]);
        });
    }
  }, [gitProfile]);
  const isGitHubProfileLinkValid = (link) => {
    const githubLinkRegex = /^https:\/\/github.com\/[A-Za-z0-9_-]+$/;
    return githubLinkRegex.test(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (value, key) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  return (
    <>
      <Grid
        container
        sx={{
          width: "80%",
          margin: "0 auto",
          marginTop: "40px",
          "@media (max-width: 800px)": {
            flexDirection: "column",
          },
        }}
      >
        <Grid item md={2} xs={0} sx={{ marginRight: "16px" }}>
          <div style={{ ...sharedStyles.profileInnerStyle }}>
            <Face2Icon sx={{ width: "100px", height: "100px" }} />
            <Typography
              sx={{ textAlign: "center", ...sharedStyles.titleStyle }}
            >
              {profileData.name}
            </Typography>
            <Link
              style={{
                color: "#007bff",
                listStyleType: "none",
                textDecoration: "none",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#333",
                },
              }}
              to={`/search/${params.id}`}
            >
              Back to search
            </Link>
          </div>
        </Grid>
        <Grid
          md={7}
          sx={{
            marginRight: "16px",
            backgroundColor: "#dbe9fa",
            padding: "20px 0",
          }}
        >
          <Typography sx={{ textAlign: "center", ...sharedStyles.titleStyle }}>
            Add in your profile details and search preferences:
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
                name={"name"}
                //   defaultValue={form.name}
                label="Name"
                required
                margin="normal"
                variant="standard"
                // error={
                //   profile.name === "" ||
                //   profile.name === null ||
                //   !isNameValid(profile.name)
                // }
                // helperText={
                //   ((profile.name === "" || profile.name === null) &&
                //     "Name is required") ||
                //   (!isNameValid(profile.name) && "Invalid name")
                // }
                value={profileData.name}
                id="name-standard-required"
                onChange={(e) => handleChange(e.target.value, "name")}
                style={{ marginRight: "60px" }}
              />

              <TextField
                label="Add the link to your GitHub profile"
                value={profileData.git_url}
                error={
                  profileData.git_url === "" ||
                  profileData.git_url === null ||
                  !isGitHubProfileLinkValid(profileData.git_url)
                } //this will show err message only when there is error
                helperText={
                  ((profileData.git_url === "" ||
                    profileData.git_url === null) &&
                    "Git profile is required") ||
                  (!isGitHubProfileLinkValid(profileData.git_url) &&
                    "Invalid GitHub profile link")
                }
                onChange={handleGitProfileChange}
                sx={{ marginTop: "40px" }}
              />
              <ul>
                {repositories &&
                  repositories.map((repo) => (
                    <li style={{ color: "#333" }} key={repo.id}>
                      {repo.name}
                    </li>
                  ))}
              </ul>
              <TextField
                inputProps={{ step: "0.5" }}
                type="number"
                name={"tenure"}
                label="Total work experience in years"
                required
                value={profileData.experience}
                margin="normal"
                variant="standard"
                //   error={
                //     form.tenure === "" || form.tenure === null || form.tenure === 0
                //       ? true
                //       : false
                //   } //this will show err message only when there is error
                helperText="Experience is required"
                id="pyramid-standard-required"
                onChange={(e) => handleChange(e.target.value, "experience")}
                style={{ marginRight: "60px" }}
              />
              {/* <Autocomplete
                multiple
                id="tags-standard"
                options={skills}
                getOptionLabel={(option) => option}
                onInputChange={handleInputChange}
                // defaultValue={[top100Films[13]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Skills"
                    placeholder="Skillsets"
                  />
                )}
              /> */}
            </FormControl>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "dodgerblue",
                width: "140px",
                m: 2,
              }}
              disabled
              //   disabled={continueButton}
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
      </Grid>
    </>
  );
};

export default SearcherProfile;
