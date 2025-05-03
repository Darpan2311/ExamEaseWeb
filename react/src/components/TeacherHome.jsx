
import { Outlet, useLocation } from "react-router-dom";
import TeacherSideBar from "./TeacherSideBar";
import "../css/Teacherdashboard.css"
const getActiveLabel = (pathname) => {
  if (pathname.includes("dashboard")) return "Dashboard";
  if (pathname.includes("/exams/create")) return "TestBuilder";
  if (pathname.includes("createdexams")) return "ExamList";
  if (pathname.includes("reports")) return "Reports";
  return "";
};

const TeacherHome = () => {
  const location = useLocation();
  const active = getActiveLabel(location.pathname);

  return (
    <div className="container">
        <div className="home-container2">
        <aside className="home-sidebar2">
        <TeacherSideBar/>
    </aside>
    <main id="home-content2">
        <Outlet />
      </main>
        </div>
      
     
    </div>
  );
};

export default TeacherHome;
