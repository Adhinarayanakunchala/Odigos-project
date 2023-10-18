import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./components/pages/User";
import SideBar from "./components/SideBar";
import { ToastContainer } from "react-toastify";
import Login from "./components/Loginpage/Login";
import CourseDetails from "./components/pages/CourseDetails";
import Videopage from "./components/pages/Videopage";
import { useAuth } from "./Context/AuthContext";
import { useLayoutEffect } from "react";
import { Gaurd } from "./components/Gaurd";

function App() {
  const { setIsLogin, setTokens } = useAuth();

  useLayoutEffect(() => {
    const storedToken = localStorage.getItem('Token');
    if (storedToken) {
      setTokens(storedToken);
      setIsLogin(true);
    }
  }, [setIsLogin, setTokens]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      <SideBar>
        <Routes>

          <Route path="/" element={<Login />} />

          <>
            <Route path="/user" element={<Gaurd element={<User />} />} />
            <Route path='/details' element={<CourseDetails />} />
            <Route path="/play/:videoURL" element={<Videopage />} />
          </>



        </Routes>
      </SideBar>

    </div>
  );
}

export default App;
