import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./component/Home/Home.js";
import { useEffect } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  });
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
