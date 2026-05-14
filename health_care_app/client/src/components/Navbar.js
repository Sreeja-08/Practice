import {
    FaHome,
    FaCalendarCheck,
    FaRobot,
    FaFileMedical,
    FaSignOutAlt
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import "../styles/auth.css";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="sidebar">

            <h2>HealthCare</h2>

            <Link to="/dashboard">
                <FaHome /> Dashboard
            </Link>

            <Link to="/appointments">
                <FaCalendarCheck /> Appointments
            </Link>

            <Link to="/ai-chat">
                <FaRobot /> AI Assistant
            </Link>

            <Link to="/prescriptions">
                <FaFileMedical /> Prescriptions
            </Link>

            <button onClick={logout}>
                <FaSignOutAlt /> Logout
            </button>

        </div>

    );

}

export default Navbar;