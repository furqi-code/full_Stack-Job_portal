import { Outlet } from "react-router";
import Header from "../shared/header";
import Footer from "../shared/footer";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
