import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const ViewEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const history = useHistory();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    empNo: "",
    department: "",
  });

  const fetchEmployee = async (id) => {
    const result = await axios.get(`http://localhost:8081/employees/${id}`);
    dispatch({ type: "SET_CURRENT_EMPLOYEE", payload: result.data });
    setEmployee(result.data);
  };

  //destructuring
  const { firstName, lastName, email, empNo, department } = employee;

  useEffect(() => {
    fetchEmployee(id);
  }, []);

  return (
    <div className="container">
      View Employee...
      <h3>{firstName}</h3>
      <h3>{lastName}</h3>
      <h3>{email}</h3>
      <h3>{empNo}</h3>
      <h3>{department}</h3>

      <div className="mt-3">
        <button
          className="btn btn-primary btn-block"
          onClick={() => history.push("/employees")}
        >
          Back to Employee List
        </button>
      </div>
    </div>
  );
};

export default ViewEmployee;
