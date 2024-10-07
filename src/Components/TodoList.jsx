import { useState, useRef } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function TodoList() {
  const [todo, setTodo] = useState({ desc: "", date: "", priority: "" });
  const [todolist, setTodolist] = useState([]);
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: "desc", sortable: true, filter: true, floatingFilter: true },
    { field: "date", sortable: true, filter: true, floatingFilter: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: (param) =>
        param.value === "High" ? { color: "red" } : { color: "black" },
    },
  ]);

  const inputChanged = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    if (todo.desc == "" || todo.date == "" || todo.priority == "") {
      alert("The field(s) is empty!!!");
    } else {
      setTodolist([...todolist, todo]);
      setTodo({ desc: "", priority: "", date: "" });
    }
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodolist(
        todolist.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else alert("Select a row first.");
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <TextField
          name="desc"
          label="Description"
          value={todo.desc}
          onChange={inputChanged}
        />

        {/* <TextField name="date" label="Date" value={todo.date} /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            onChange={(e) =>
              setTodo({ ...todo, date: e.toISOString().split("T")[0] })
            }
          />
        </LocalizationProvider>

        <TextField
          name="priority"
          label="Priority"
          value={todo.priority}
          onChange={inputChanged}
        />

        <Button variant="outlined" onClick={addTodo}>
          Add
        </Button>
        <Button variant="outlined" color="error" onClick={deleteTodo}>
          Delete
        </Button>
      </Stack>

      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={(param) => (gridRef.current = param.api)}
          rowData={todolist}
          columnDefs={columnDefs}
          rowSelection="single"
        />
      </div>
    </div>
  );
}

export default TodoList;
