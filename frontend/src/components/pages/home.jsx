import { JobContextProvider } from "../../store/jobContext";
import { Outlet } from "react-router-dom";
import Header from "../shared/header";
import Footer from "../shared/footer";

const Home = () => {
  return (
    <JobContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </JobContextProvider>
  );
};

export default Home;
