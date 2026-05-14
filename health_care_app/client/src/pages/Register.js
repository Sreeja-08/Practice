import { useState } from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

import "../styles/auth.css";


function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        role: "patient"

    });


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // REGISTER USER
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:5000/api/auth/register",

                formData

            );

            alert("Registration Successful");

            navigate("/");

        }

        catch (error) {

            console.log(error);

            alert("Registration Failed");

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
                    Register
                </h2>


                {/* REGISTER FORM */}
                <form onSubmit={handleSubmit}>


                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        required
                    />


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


                    <select
                        name="role"
                        onChange={handleChange}
                    >

                        <option value="patient">
                            Patient
                        </option>

                        <option value="doctor">
                            Doctor
                        </option>

                    </select>


                    <button type="submit">

                        Register

                    </button>

                </form>


                {/* LOGIN LINK */}
                <div className="auth-link">

                    Already registered?

                    <Link to="/">

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;