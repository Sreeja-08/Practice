import Navbar from "../components/Navbar";

import "../styles/auth.css";

function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div className="page">

            <Navbar />

            <div className="main-content">

                <h1>
                    Welcome, {user?.name}
                </h1>

                <p>
                    Manage your healthcare system
                </p>

                <div className="card-container">

                    <div className="card">

                        <h2>Appointments</h2>

                        <p>
                            Manage appointments
                        </p>

                    </div>


                    <div className="card">

                        <h2>AI Assistant</h2>

                        <p>
                            Ask health questions
                        </p>

                    </div>


                    <div className="card">

                        <h2>Prescriptions</h2>

                        <p>
                            View prescriptions
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;