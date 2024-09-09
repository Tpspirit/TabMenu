import { useState, useRef } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TodoList() {
  const [todo, setTodo] = useState({ desc: "", date: "" });
  const [todolist, setTodolist] = useState([]);
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: "desc", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: (param) =>
        param.value === "High" ? { color: "red" } : { color: "black" },
    },
  ]);

  const inputChanged = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    if (todo.desc == "" || todo.date == "" || todo.desc == "") {
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
      <input
        name="desc"
        placeholder="Description"
        type="text"
        value={todo.desc}
        onChange={inputChanged}
      />

      <input
        name="date"
        type="text"
        placeholder="Date"
        value={todo.date}
        onChange={inputChanged}
      />

      <input
        type="text"
        name="priority"
        value={todo.priority}
        placeholder="Priority"
        onChange={inputChanged}
      />

      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      {/* <table>
        <tbody>
          {todolist.map((todo, index) => (
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.desc}</td>
              <td>{todo.desc}</td>
              <td>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

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
