import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Provider, useSelector, useDispatch } from "react-redux";

import { ProSidebarProvider } from 'react-pro-sidebar';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Collage from "./scenes/collage";
import University from "./scenes/university";
import Bar from "./scenes/bar";
import ICourseCourses from "./scenes/i-courseCourses";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Login from './scenes/login';
import Department from "./scenes/department";
import Materials from "./scenes/materials";
import Groups  from "./scenes/groups";
import IcourseCategory  from  "./scenes/i-courseCategory";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    dispatch({ type: 'auth/checkToken' });
    if (isAuth) {
      setIsSidebar(true)
    }

  }, [isAuth]);

  return (

    <ColorModeContext.Provider value={colorMode}>
      <ProSidebarProvider>

        <ThemeProvider theme={theme}>

          <CssBaseline />

          <div className="app">

            {!isAuth ? (
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
            ) : (
              <>
                <Sidebar isSidebar={isSidebar} />

                <main className="content">

                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    <Route path="/" element={<Users />} />
                    <Route path="/university" element={<University />} />
                    <Route path="/Collage" element={<Collage />} />
                    <Route path="/Department" element={<Department />} />
                    <Route path="/Materials" element={<Materials />} />
                    <Route path="/Groups" element={<Groups />} />
                    <Route path="/i-course" element={<ICourseCourses />} />
                    <Route path="/i-category" element={<IcourseCategory />} />


                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />

                  </Routes>
                </main>
              </>
            )}
          </div>
        </ThemeProvider>
      </ProSidebarProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
