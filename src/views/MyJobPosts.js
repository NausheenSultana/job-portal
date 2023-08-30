import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Grid, Card } from "@mui/material";
import { styled } from "@mui/system";
import sharedStyles from "../styles/Styles";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Face2Icon from "@mui/icons-material/Face2";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const Wrapper = styled("div")(sharedStyles.wrapperStyle);

export default function PostJob() {
  const params = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/jobs`);
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, []);

  let jobsCopy = [];
  for (let oneJob of jobs) {
    if (oneJob.contact.pid === params.id) {
      jobsCopy.push(oneJob);
    }
  }

  return (
    <Wrapper>
      <Grid container justifyContent="center">
        <Grid item xs={2} sx={{ marginRight: "16px", ...sharedStyles.profile }}>
          <div style={{ ...sharedStyles.profileInnerStyle }}>
            <Face2Icon style={{ width: "100px", height: "100px" }} />
            <Typography
              sx={{ textAlign: "center", ...sharedStyles.titleStyle }}
            >
              {params.id}
            </Typography>
            <Link
              to={`/add-job/${params.id}`}
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
              Post a new job
              <EditIcon />
            </Link>
          </div>
        </Grid>

        <Grid item xs={7} sx={{ marginRight: "16px" }}>
          {jobsCopy.map((job) => (
            <Card style={{ ...sharedStyles.jobCardStyle }}>
              <Typography sx={sharedStyles.titleStyle}>
                {job.job_title}
              </Typography>
              <Typography sx={sharedStyles.descriptionStyle}>
                {job.description}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className={sharedStyles.iconLinkStyle}
              >
                <PlaceIcon style={{ marginRight: "8px" }} />{" "}
                <span>{job.company}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className={sharedStyles.iconLinkStyle}
              >
                <BusinessCenterIcon style={{ marginRight: "8px" }} />{" "}
                <span>{job.location}</span>
              </div>

              <Typography style={{ fontWeight: "bolder" }}>
                Salary: {job.salary}
              </Typography>
              <br />
              <Typography>
                <span style={{ fontWeight: "bolder" }}>Applicants:</span>
                {job.applied.length > 0
                  ? job.applied.map((applicant) => (
                      <div key={applicant.aid}>
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
                          to={`/profile/${applicant.aid}/${params.id}`}
                        >
                          {applicant.name}
                        </Link>
                      </div>
                    ))
                  : " None so far"}
              </Typography>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Wrapper>
  );
}
