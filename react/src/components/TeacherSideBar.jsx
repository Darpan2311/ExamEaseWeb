    import { useNavigate } from "react-router-dom";
    import '../css/Sidebar2.css'
    const TeacherSideBar = ({ active }) => {
    const navigate = useNavigate();

    const navItems = [
        { label: "Dashboard", icon: "⌂", path: "/teacher/dashboard" },
        { label: "Test Builder", icon: "📝", path: "exam/create" },
        { label: "Exams", icon: "📚", path: "createdexams" },
        { label: "Reports", icon: "📊", path: "/admin/reports" },
        { label: "Log Out", icon: "🚪", path: "/login" }

    ];


    const handleNavigation = (path) => {
        if (path === "/login") {
          // Clear any login data here (like token, localStorage, etc.)
          localStorage.clear(); // or sessionStorage.clear()
          
          // Redirect with history replacement
          navigate(path, { replace: true });
        } else {
          navigate(path);
        }
    };

    return (
        <div className="sidebar-header">
            
        <nav className="sidebar-nav2">
            {navItems.map((item) => (
            <button
                key={item.label}
                className={`sidebar-nav-item2 ${active === item.label ? "active" : ""}`}
                onClick={() => handleNavigation(item.path)}>
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
            </button>
            ))}
        </nav>
        </div>

    );
    };

    export default TeacherSideBar;
