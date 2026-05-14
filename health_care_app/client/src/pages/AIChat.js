import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/auth.css";


function AIChat() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // PROTECTED ROUTE
    if (!user) {

        window.location.href = "/";

    }

    const [message, setMessage] = useState("");

    const [reply, setReply] = useState("");

    const [loading, setLoading] = useState(false);


    const askAI = async () => {

        if (!message) {

            alert("Please enter symptoms");

            return;

        }

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:5000/api/ai/chat",

                { message }

            );

            setReply(res.data.reply);

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);

            alert("AI Error");

        }

    };


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
                    AI Health Assistant
                </h1>

                <p
                    style={{
                        color:"gray",
                        marginBottom:"20px"
                    }}
                >
                    Ask health-related questions and get AI guidance
                </p>


                {/* CHAT CONTAINER */}
                <div
                    className="chat-box"
                    style={{
                        maxWidth:"700px"
                    }}
                >

                    <h3
                        style={{
                            marginBottom:"15px"
                        }}
                    >
                        Describe Your Symptoms
                    </h3>


                    {/* USER INPUT */}
                    <textarea
                        rows="5"
                        placeholder="Example: I have headache and fever..."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                    />


                    {/* BUTTON */}
                    <button onClick={askAI}>

                        Ask AI

                    </button>


                    {/* LOADING */}
                    {
                        loading && (

                            <p
                                style={{
                                    marginTop:"20px",
                                    color:"#1976d2"
                                }}
                            >
                                AI is analyzing symptoms...
                            </p>

                        )
                    }


                    {/* USER MESSAGE */}
                    {
                        message && !loading && (

                            <div
                                style={{
                                    marginTop:"30px",
                                    display:"flex",
                                    justifyContent:"flex-end"
                                }}
                            >

                                <div
                                    style={{
                                        background:"#1976d2",
                                        color:"white",
                                        padding:"15px",
                                        borderRadius:"15px",
                                        maxWidth:"70%"
                                    }}
                                >

                                    <p>{message}</p>

                                </div>

                            </div>

                        )
                    }


                    {/* AI RESPONSE */}
                    {
                        reply && !loading && (

                            <div
                                style={{
                                    marginTop:"20px",
                                    display:"flex",
                                    justifyContent:"flex-start"
                                }}
                            >

                                <div
                                    style={{
                                        background:"#f1f5ff",
                                        padding:"15px",
                                        borderRadius:"15px",
                                        maxWidth:"70%",
                                        boxShadow:
                                        "0 5px 15px rgba(0,0,0,0.08)"
                                    }}
                                >

                                    <h4
                                        style={{
                                            marginBottom:"10px",
                                            color:"#1976d2"
                                        }}
                                    >
                                        AI Assistant
                                    </h4>

                                    <p
                                        style={{
                                            lineHeight:"1.6"
                                        }}
                                    >
                                        {reply}
                                    </p>

                                </div>

                            </div>

                        )
                    }


                    {/* DISCLAIMER */}
                    <p
                        style={{
                            marginTop:"25px",
                            color:"red",
                            fontSize:"14px"
                        }}
                    >
                        Not medical advice. Consult a doctor.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default AIChat;