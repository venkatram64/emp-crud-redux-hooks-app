import React, { useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
/**
 * This class uses react-redux to add an employee to the store.
 * The store is located in /src/redux/store.js and is created using
 * the createStore function from 'redux' and the 'rootReducer' function
 * from /src/redux/rootReducer.js
 * The root reducer is created using combineReducers which takes an object
 * with the name of the reducer as the key and the reducer function as the
 * value. In this case, the only reducer is the 'employeeReducer' from
 * /src/redux/reducers/employeeReducer.js
 * The employeeReducer handles the following actions:
 *  - ADD_EMPLOYEE: adds a new employee to the store
 *  - DISPLAY_EMPLOYEE: sets the state of the employee in the store to the
 *    employees fetched from the rest api
 * The employees are fetched from the rest api located at
 * http://localhost:8081/employees
 * The employee is added to the store using the useDispatch hook and the
 * addEmployee function is called with the employee as the argument
 * The addEmployee function is defined in the employeeReducer and is
 * called with the employee as the argument
 * The employee is then added to the state of the store and the component
 * is updated with the new employee
 */
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
  //useSelector is a hook that allows you to access the state of the store
  //and subscribe to changes in the state. It takes a function as an argument
  //that is called with the state of the store as the argument. The function
  //should return a value that is the value of the state that you want to
  //access. In this case, the function is an arrow function that returns the
  //state of the employee. The employee state is an object with the following
  //properties: employees, which is an array of objects with the following
  //properties: id, firstName, lastName, email, empNo, department.
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
