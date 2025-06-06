import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AllRoute from "./routes/AllRoute";

function App() {
  return (
    <>
      <Navbar />
      <AllRoute />
      <Footer />
    </>
  );
}

export default App;
