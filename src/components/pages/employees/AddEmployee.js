import React, { useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: nanoid(),
    firstName: "",
    lastName: "",
    email: "",
    empNo: "",
    department: "",
  });

  const dispatch = useDispatch();

  const emp = useSelector((state) => state.employee);

  const navigate = useNavigate();

  //destructuring
  const { firstName, lastName, email, empNo, department } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !empNo || !department) {
      return toast.warning("Please enter all the form fields.");
    }

    const checkEmail =
      emp && emp.employees.find((e) => e.email === email);
    if (checkEmail) {
      return toast.error("Email is already taken.");
    }
    const checkEmpNo =
      emp && emp.employees.find((e) => e.empNo === empNo);
    if (checkEmpNo) {
      return toast.error("EmpNo is already taken.");
    }
    addEmployee(employee);
    toast.success("Employee added successfully.");
    navigate("/employees");
  };

  const addEmployee = async (employee) => {
    const response = await axios.post("http://localhost:8081/employees", {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      empNo: employee.empNo,
      department: employee.department,
    });
    dispatch({ type: "ADD_EMPLOYEE", payload: response.data });
    return response.data;
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Adding employee...</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Employee Number"
              value={empNo}
              name="empNo"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Designation"
              value={department}
              name="department"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary btn-block my-4">Add Employee</button>
            <button
              className="btn btn-primary btn-block"
              onClick={() => navigate("/employees")}
            >
              Back to Employee List
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
