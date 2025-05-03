    import { useNavigate } from "react-router-dom";
    import '../css/Sidebar2.css'
    const TeacherSideBar = ({ active }) => {
    const navigate = useNavigate();

    const navItems = [
        { label: "Dashboard", icon: "⌂", path: "/admin/dashboard" },
        { label: "Test Builder", icon: "📝", path: "exam/create" },
        { label: "Exams", icon: "📚", path: "/admin/exams" },
        { label: "Reports", icon: "📊", path: "/admin/reports" }
    ];

    return (
        <div className="sidebar-header">
            
        <nav className="sidebar-nav">
            {navItems.map((item) => (
            <button
                key={item.label}
                className={`sidebar-nav-item2 ${active === item.label ? "active" : ""}`}
                onClick={() => navigate(item.path)}>
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
            </button>
            ))}
        </nav>
        </div>

    );
    };

    export default TeacherSideBar;
