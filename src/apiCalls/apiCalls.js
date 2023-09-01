import axios from "axios";

export const getJobs = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/jobs`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return;
};
// export const getEmployees = async () => {
//   try {
//     const res = await axios.get(`http://localhost:8080/employees`);

//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return;
// };
