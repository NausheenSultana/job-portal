// import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./views/Main";

const App = () => {
  return (
    <>
      <Router>
        <Main />
      </Router>
    </>
  );
};

export default App;
