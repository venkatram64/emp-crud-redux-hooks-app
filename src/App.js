import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MainMenu from "./components/MainMenu";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import AddEmployee from "./components/pages/employees/AddEmployee";
import EditEmployee from "./components/pages/employees/EditEmployee";
import EmployeeLayout from "./components/pages/employees/EmployeeLayout";
import ListEmployees from "./components/pages/employees/ListEmployees";
import ViewEmployee from "./components/pages/employees/ViewEmployee";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="container">     
        <ToastContainer/>
      <Routes>
        <Route path="/" element={<MainMenu />}>
          <Route path="employees" element={<EmployeeLayout />}>
            <Route index element={<ListEmployees />} />
            <Route path="addEmp" element={<AddEmployee />} />
            <Route path="view/:id" element={<ViewEmployee />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
