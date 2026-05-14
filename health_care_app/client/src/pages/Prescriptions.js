import { useState, useEffect } from "react";

import axios from "axios";

import "../styles/auth.css";

import Navbar from "../components/Navbar";


function Prescriptions() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    // PROTECTED ROUTE
    if (!user) {

        window.location.href = "/";

    }


    const [formData, setFormData] = useState({

        patientName: "",

        patientEmail: "",

        prescription: "",

        doctorName: user?.name

    });


    const [prescriptions, setPrescriptions] = useState([]);


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // ADD PRESCRIPTION
    const addPrescription = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:5000/api/prescriptions/add",

                formData

            );

            alert("Prescription Added Successfully");

            setFormData({

                patientName: "",

                patientEmail: "",

                prescription: "",

                doctorName: user?.name

            });

            fetchPrescriptions();

        }

        catch (error) {

            console.log(error);

            alert("Error Adding Prescription");

        }

    };


    // FETCH PRESCRIPTIONS
    const fetchPrescriptions = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/prescriptions"

            );

            setPrescriptions(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchPrescriptions();

    }, []);


    return (

        <div className="page">

            {/* SIDEBAR */}
            <Navbar />


            {/* MAIN CONTENT */}
            <div className="main-content">

                <h1>
                    Prescriptions
                </h1>

                <p
                    style={{
                        color:"gray",
                        marginBottom:"30px"
                    }}
                >
                    Manage and view prescription records
                </p>


                {/* DOCTOR FORM */}
                {
                    user?.role === "doctor" && (

                        <div className="form-container">

                            <h2>
                                Add Prescription
                            </h2>

                            <form onSubmit={addPrescription}>

                                <input
                                    type="text"
                                    name="patientName"
                                    placeholder="Patient Name"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    required
                                />


                                <input
                                    type="email"
                                    name="patientEmail"
                                    placeholder="Patient Email"
                                    value={formData.patientEmail}
                                    onChange={handleChange}
                                    required
                                />


                                <textarea
                                    rows="5"
                                    name="prescription"
                                    placeholder="Write Prescription"
                                    value={formData.prescription}
                                    onChange={handleChange}
                                    required
                                />


                                <button type="submit">

                                    Add Prescription

                                </button>

                            </form>

                        </div>

                    )
                }


                {/* PRESCRIPTION RECORDS */}
                <div
                    style={{
                        marginTop:"40px"
                    }}
                >

                    <h2>
                        Your Records
                    </h2>


                    {
                        prescriptions
                        .filter((item) => {

                            if (user?.role === "doctor") {

                                return (
                                    item.doctorName === user.name
                                );

                            }

                            return (
                                item.patientEmail === user.email
                            );

                        })
                        .length === 0 ? (

                            <p
                                style={{
                                    marginTop:"20px",
                                    color:"gray"
                                }}
                            >
                                No prescriptions found
                            </p>

                        ) : (

                            prescriptions
                            .filter((item) => {

                                if (user?.role === "doctor") {

                                    return (
                                        item.doctorName === user.name
                                    );

                                }

                                return (
                                    item.patientEmail === user.email
                                );

                            })
                            .map((item) => (

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
                                                    color:"#1976d2",
                                                    marginBottom:"10px"
                                                }}
                                            >
                                                Dr. {item.doctorName}
                                            </h3>

                                            <p
                                                style={{
                                                    color:"gray",
                                                    marginBottom:"8px"
                                                }}
                                            >
                                                Patient:
                                                {" "}
                                                {item.patientName}
                                            </p>

                                            <p
                                                style={{
                                                    lineHeight:"1.6"
                                                }}
                                            >
                                                {item.prescription}
                                            </p>

                                        </div>


                                        {/* STATUS BADGE */}
                                        <div
                                            className="status"
                                            style={{
                                                background:"#e3f2fd",
                                                color:"#1976d2",
                                                marginTop:"10px"
                                            }}
                                        >
                                            Prescription
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

export default Prescriptions;