import { useState } from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

import "../styles/auth.css";


function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // LOGIN USER
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(

                "http://localhost:5000/api/auth/login",

                formData

            );

            localStorage.setItem(

                "user",

                JSON.stringify(res.data.user)

            );

            alert("Login Successful");

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

            alert("Invalid Credentials");

        }

    };


    return (

        <div className="auth-wrapper">

            <div className="form-container">


                {/* APP TITLE */}
                <h1>
                    HealthCare App
                </h1>


                {/* PAGE TITLE */}
                <h2>
                    Login
                </h2>


                {/* LOGIN FORM */}
                <form onSubmit={handleSubmit}>


                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        required
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        required
                    />


                    <button type="submit">

                        Login

                    </button>

                </form>


                {/* REGISTER LINK */}
                <div className="auth-link">

                    New User?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;