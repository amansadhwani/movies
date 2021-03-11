import "./App.css";
import MoviesList from "./Components/MoviesList";
import Header from "./Components/Header";
//import Footer from "./Components/Footer";
//import Carsouel from "./Components/Carousell";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div id="app">
      <Router>
        <Header />

        <MoviesList />
      </Router>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
