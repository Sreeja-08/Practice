import { useState, useEffect } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/auth.css";


function Appointments() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    // PROTECTED ROUTE
    if (!user) {

        window.location.href = "/";

    }


    const [formData, setFormData] = useState({

        patientName: user?.name,

        patientEmail: user?.email,

        doctorName: "",

        date: "",

        time: ""

    });


    const [appointments, setAppointments] = useState([]);


    const doctors = [

        "Dr. Ravi",

        "Dr. Priya",

        "Dr. Kumar",

        "Dr. Meena"

    ];


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // BOOK APPOINTMENT
    const bookAppointment = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:5000/api/appointments/book",

                formData

            );

            alert("Appointment Booked Successfully");

            fetchAppointments();

        }

        catch (error) {

            console.log(error);

            alert("Error Booking Appointment");

        }

    };


    // FETCH ONLY LOGGED-IN USER APPOINTMENTS
    const fetchAppointments = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/api/appointments/${user.email}`

            );

            setAppointments(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchAppointments();

    }, []);


    return (

        <div className="page">

            {/* SIDEBAR */}
            <Navbar />


            {/* MAIN CONTENT */}
            <div className="main-content">

                <h1
                    style={{
                        marginBottom:"10px"
                    }}
                >
                    Appointments
                </h1>

                <p
                    style={{
                        color:"gray",
                        marginBottom:"25px"
                    }}
                >
                    Book and manage your healthcare appointments
                </p>


                {/* APPOINTMENT FORM */}
                <div className="form-container">

                    <h2>
                        Book Appointment
                    </h2>

                    <form onSubmit={bookAppointment}>

                        <select
                            name="doctorName"
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Doctor
                            </option>

                            {
                                doctors.map((doctor, index) => (

                                    <option
                                        key={index}
                                        value={doctor}
                                    >
                                        {doctor}
                                    </option>

                                ))
                            }

                        </select>


                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            required
                        />


                        <input
                            type="time"
                            name="time"
                            onChange={handleChange}
                            required
                        />


                        <button type="submit">

                            Book Appointment

                        </button>

                    </form>

                </div>


                {/* APPOINTMENTS SECTION */}
                <div
                    style={{
                        marginTop:"40px"
                    }}
                >

                    <h2>
                        Your Appointments
                    </h2>


                    {
                        appointments.length === 0 ? (

                            <p
                                style={{
                                    marginTop:"20px",
                                    color:"gray"
                                }}
                            >
                                No appointments available
                            </p>

                        ) : (

                            appointments.map((item) => (

                                <div
                                    key={item._id}
                                    className="appointment-card"
                                >

                                    <div
                                        style={{
                                            display:"flex",
                                            justifyContent:"space-between",
                                            alignItems:"center",
                                            flexWrap:"wrap"
                                        }}
                                    >

                                        {/* LEFT SECTION */}
                                        <div>

                                            <h3
                                                style={{
                                                    color:"#1976d2"
                                                }}
                                            >
                                                {item.doctorName}
                                            </h3>

                                            <p
                                                style={{
                                                    marginTop:"8px",
                                                    color:"gray"
                                                }}
                                            >
                                                Patient:
                                                {" "}
                                                {item.patientName}
                                            </p>

                                            <p
                                                style={{
                                                    color:"gray"
                                                }}
                                            >
                                                Date:
                                                {" "}
                                                {item.date}
                                            </p>

                                            <p
                                                style={{
                                                    color:"gray"
                                                }}
                                            >
                                                Time:
                                                {" "}
                                                {item.time}
                                            </p>

                                        </div>


                                        {/* STATUS BADGE */}
                                        <div
                                            className="status"
                                            style={{
                                                background:
                                                item.status === "Pending"
                                                ? "#fff3cd"
                                                : "#d4edda",

                                                color:
                                                item.status === "Pending"
                                                ? "#856404"
                                                : "#155724",

                                                padding:"8px 18px",

                                                borderRadius:"30px",

                                                fontWeight:"600",

                                                marginTop:"10px"
                                            }}
                                        >

                                            {item.status}

                                        </div>

                                    </div>

                                </div>

                            ))

                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default Appointments;