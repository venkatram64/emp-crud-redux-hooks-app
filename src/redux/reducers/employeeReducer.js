const initialState = {
  employees: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_EMPLOYEE":
      return {
        ...state,
        employees: action.payload,
      };

    case "ADD_EMPLOYEE":
      const employees = [...state.employees, action.payload];
      return {
        ...state,
        employees: employees,
      };

    case "SET_CURRENT_EMPLOYEE":
      return action.payload;

    case "EDIT_EMPLOYEE":
      const updateEmployee =
        state &&
        state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        );
      return updateEmployee;

    case "DELETE_EMPLOYEE":
      const filteredEmps =
        state &&
        state.employees.filter((emp) => emp.id !== action.payload.id);
      return {
        ...state,
        employees: filteredEmps,
      };

    default:
      return state;
  }
};

export default employeeReducer;
