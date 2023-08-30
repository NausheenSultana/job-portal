import { Routes, Route } from "react-router-dom";
import Login from "../src/views/Login";
import Header from "./components/header";
import JobSearch from "../src/views/JobSearch";
import SearcherProfile from "./views/MyProfile";
import PostJob from "./views/MyJobPosts";
import AddJob from "./views/AddNewJobForm";
import FreelancerProfile from "./views/FreelancerProfilePage";

export const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Login />
              {/* LogIn page */}
            </>
          }
        />
        <Route
          path="/post-job/:id"
          element={
            <>
              <Header />
              <PostJob />
              {/* Posted Job page */}
            </>
          }
        />
        <Route
          path="/add-job/:id"
          element={
            <>
              <Header />
              <AddJob />
              {/* Add a new job page */}
            </>
          }
        />
        <Route
          path="/my-profile/:id"
          element={
            <>
              <Header />
              <SearcherProfile />
              {/* Edit profile of the employee */}
            </>
          }
        />
        <Route
          path="/profile/:aid/:pid"
          element={
            <>
              <Header />
              <FreelancerProfile />
              {/* Card of an employee for recruiters to view */}
            </>
          }
        />

        <Route
          exact
          path="/search/:id"
          element={
            <>
              <Header />
              <JobSearch />
              {/* Jobs listed for employees page */}
            </>
          }
        />
      </Routes>
    </>
  );
};
