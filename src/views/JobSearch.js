import { useEffect, useState } from "react";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  Grid,
  Card,
  TextField,
  Autocomplete,
  FormControl,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Face2Icon from "@mui/icons-material/Face2";
import EditIcon from "@mui/icons-material/Edit";
import employees from "../data/freelancers.json";
import skills from ".././skills.json";
import { styled } from "@mui/system";
import sharedStyles from "../styles/Styles";
import formStyle from "../styles/FormStyle";
import { Pagination } from "@mui/material";

const Wrapper = styled("div")(sharedStyles.wrapperStyle);

const JobSearch = () => {
  let filteredJobs = [];
  const params = useParams();
  const [jobs, setJobs] = useState([]);
  let emp = employees.find((element) => element.employee_id === params.id);
  const [salary, setSalary] = useState(30);
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [saveInitialState, setSaveInitialState] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  let [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = Math.ceil(jobs.length / itemsPerPage);

  const handlePageChange = (e, p) => {
    setPage(p);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (skillSet.length > 0) {
      skillSet.forEach((oneSkill) => {
        for (let oneJob of saveInitialState) {
          if (oneJob.skillset.indexOf(oneSkill) > -1) {
            setNotFoundMessage(false);
            filteredJobs.push(oneJob);
            // setJobs(filteredJobs);
          } else {
            console.log("entered 4");
          }
        }
      });
      if (filteredJobs.length === 0) {
        setNotFoundMessage(true);
      }
    } else {
      setNotFoundMessage(false);
      // setJobs(saveInitialState);
    }
    if (filteredJobs.length === 0) {
      filteredJobs = saveInitialState;
    }
    let filteredRows = [];
    if (salary > 1) {
      filteredJobs &&
        filteredJobs.map((job) => {
          let salaryMax = job.salary
            .match(/\d+/g)
            .reduce((a, b) => Math.max(a, b));
          if (
            parseInt(salary) <= salaryMax &&
            filteredRows.indexOf(job) === -1
          ) {
            filteredRows.push(job);
          }
        });

      if (filteredRows.length === 0) {
        setNotFoundMessage(true);
      } else {
        setNotFoundMessage(false);
      }
      setJobs(filteredRows);
    }
  }, [setSalary, salary]);

  const easyApply = (e, job) => {
    // apply to a job
    let appliedData = [];
    e.preventDefault();
    let newApplication = {
      name: emp.name,
      aid: emp.employee_id,
    };
    let jobsCopy = [...jobs];
    for (let oneJob of jobsCopy) {
      if (oneJob.job_id === job.job_id) {
        appliedData = oneJob.applied;
        let obj = appliedData.find((o) => o.aid === newApplication.aid);
        if (obj === undefined) {
          appliedData.push(newApplication);
        }
      }
    }
    setJobs(jobsCopy);
    sendApplication(job.job_id, appliedData);
    // sendApplication(job.job_id, emp.employee_id);
  };

  // salary filter
  useEffect(() => {
    if (salary > 1) {
      saveInitialState &&
        saveInitialState.forEach((job) => {
          let salaryMax = job.salary
            .match(/\d+/g)
            .reduce((a, b) => Math.max(a, b));
          if (
            parseInt(salary) <= salaryMax &&
            filteredRows.indexOf(job) === -1
          ) {
            filteredRows.push(job);
          }
        });

      setJobs(filteredRows);
    } else setJobs(saveInitialState);

    if (skillSet.length > 0) {
      skillSet.forEach((oneSkill) => {
        for (let oneJob of jobs) {
          if (oneJob.skillset.indexOf(oneSkill) > -1) {
            setNotFoundMessage(false);
            filteredJobs.push(oneJob);
            setJobs(filteredJobs);
          } else {
            console.log("entered 4");
          }
        }
      });
      if (filteredJobs.length === 0) {
        setJobs(saveInitialState);
        setNotFoundMessage(true);
      }
    } else {
      setNotFoundMessage(false);
    }
  }, [setSkillSet, skillSet]);

  async function sendApplication(job_id, appliedData) {
    try {
      const response = await axios.post("http://localhost:8080/job/apply", {
        job_id: job_id,
        applied: appliedData,
      });

      if (response.status === 200) {
        console.log("Job application sent:", response.data);
      }
    } catch (error) {
      console.error("Error sending job application:", error);
    }
  }

  const findApplication = (job) => {
    let msg = "";
    job.applied.forEach((applicant) => {
      if (applicant.aid === params.id) {
        msg = "Already Applied";
      }
    });
    if (msg !== "Already Applied") msg = "Easy Apply";
    return msg;
  };

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/jobs`);
        setJobs(res.data);
        setSaveInitialState(res.data);
      } catch (error) {
        console.log(error);
      }
      return;
    };
    getJobs();
  }, [setJobs]);

  let filteredRows = [];

  return (
    <Wrapper>
      <Grid data-testid="profile" container justifyContent="center">
        <Grid
          item
          xs={7}
          md={2}
          sx={{ marginRight: "16px", ...sharedStyles.profile }}
          style={{ gap: 15 }}
        >
          <div style={{ ...sharedStyles.profileInnerStyle }}>
            <Face2Icon sx={{ width: "100px", height: "100px" }} />
            <Typography
              sx={{ textAlign: "center", ...sharedStyles.titleStyle }}
            >
              {emp.name}
            </Typography>
            <Link
              to={`/my-profile/${params.id}`}
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
              View and edit profile
              <EditIcon />
            </Link>
          </div>
        </Grid>

        <Grid item xs={7} sx={{ marginRight: "16px" }}>
          {notFoundMessage ? (
            <Typography
              sx={{ textAlign: "center", ...sharedStyles.titleStyle }}
            >
              No jobs found with this skillset. Try something else.
            </Typography>
          ) : (
            jobs &&
            jobs.slice(startIndex, endIndex).map((job) => (
              <>
                <Card sx={{ ...sharedStyles.jobCardStyle }}>
                  <Typography sx={sharedStyles.titleStyle}>
                    {job.job_title}
                  </Typography>
                  <Typography sx={sharedStyles.descriptionStyle}>
                    {job.description}
                  </Typography>
                  <div
                    style={{
                      color: "#888",
                      ...sharedStyles.linkStyle,
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
                    <PlaceIcon sx={{ marginRight: "4px" }} />
                    {job.location}
                  </div>
                  <div
                    style={{
                      color: "#888",
                      ...sharedStyles.linkStyle,
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
                    <BusinessCenterIcon sx={{ marginRight: "4px" }} />
                    {job.company}
                  </div>
                  <Typography
                    style={{
                      marginTop: "10px 0",
                      fontWeight: "bolder",
                      color: "#474d6a",
                    }}
                  >
                    Salary: {job.salary}
                  </Typography>
                  <span style={{ color: "#474d6a" }}>Skillset:</span>
                  {job.skillset.map((skill) => (
                    <Typography
                      style={{
                        fontWeight: "bolder",
                        color: "#474d6a",
                        display: "inline",
                        marginRight: "5px",
                        backgroundColor: "#eee",
                      }}
                    >
                      {skill}{" "}
                    </Typography>
                  ))}
                  <Button
                    inputProps={{
                      "aria-label": "country",
                      "data-testid": "apply",
                    }}
                    sx={{
                      display: "block",
                      backgroundColor: "dodgerblue !important",
                      fontWeight: "bolder",
                      padding: "10px 15px !important",
                      borderRadius: "10px !important",
                      marginTop: "10px !important",
                      color: "#fff",
                      "&.Mui-disabled": {
                        color: "#grey !important",
                      },
                    }}
                    disabled={findApplication(job) === "Already Applied"}
                    onClick={(e) => easyApply(e, job)}
                  >
                    {findApplication(job)}
                  </Button>
                </Card>
              </>
            ))
          )}
        </Grid>
        <Grid
          item
          xs={7}
          md={2}
          sx={{
            ...sharedStyles.filterContainer,
            backgroundColor: "#dbe9fa",
            "@media (max-width: 700px)": {
              width: 380,
            },
          }}
        >
          <FormControl
            sx={{
              formStyle,
              "@media (min-width: 1500px)": {
                width: 180,
              },
            }}
          >
            Search by your skills
            <Autocomplete
              multiple
              data-testid="skills-autocomplete"
              id="tags-standard"
              options={skills}
              getOptionLabel={(option) => option}
              onChange={(e, value) => setSkillSet(value)}
              inputProps={{
                "data-testid": "skills-autocomplete",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  // label="Skills"
                  placeholder="Skillsets"
                />
              )}
            />
            <div style={{ marginTop: "50px" }}>
              Minimum Expected Salary
              <TextField
                inputProps={{ step: "5" }}
                type="number"
                variant="standard"
                sx={{ display: "inline" }}
                onChange={(e) => setSalary(e.target.value)}
              />
              <br />
              <span style={{ fontWeight: "bolder" }}>$</span>
              <span style={{ fontWeight: "bolder", color: "dodgerblue" }}>
                per hour
              </span>
            </div>
          </FormControl>
        </Grid>
        <Pagination
          sx={{ margin: "40px auto" }}
          count={totalItems}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Wrapper>
  );
};

export default JobSearch;
