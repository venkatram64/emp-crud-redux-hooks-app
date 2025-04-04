import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    empNo: "",
    department: "",
  });

  const history = useHistory();

  const fetchEmployee = async (id) => {
    const result = await axios.get(`http://localhost:8081/employees/${id}`);
    dispatch({ type: "SET_CURRENT_EMPLOYEE", payload: result.data });
    setEmployee(result.data);
  };

  const emp = useSelector((state) => state.employee);

  useEffect(() => {
    fetchEmployee(id);
  }, []);

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
    debugger;

    if (emp && emp.email !== email) {
      return toast.error("Email is already taken.");
    }

    if (emp && emp.empNo !== empNo) {
      return toast.error("EmpNo is already taken.");
    }
    editEmployee(employee);
    toast.success("Employee updated successfully.");
    navigate("/employees");
  };

  const editEmployee = async (employee) => {
    const result = await axios.patch(
      `http://localhost:8081/employees/${employee.id}`,
      {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        empNo: employee.empNo,
        department: employee.department,
      }
    );
    dispatch({ type: "EDIT_EMPLOYEE", payload: result.data });
    return result.data;
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Editing employee...</h2>
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
            <button className="btn btn-primary btn-block">Edit Employee</button>
            <button
              className="btn btn-primary btn-block"
              onClick={() => history.push("/employees")}
            >
              Back to Employee List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
