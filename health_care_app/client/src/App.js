import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import AIChat from "./pages/AIChat";



function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/appointments" element={<Appointments />} />

        <Route path="/ai-chat" element={<AIChat />} />


        <Route
   path="/prescriptions"
   element={<Prescriptions />}
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;