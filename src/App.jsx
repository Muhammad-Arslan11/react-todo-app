import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";
import { TodoContextProvider } from "./Context/TodoContext.js";

function App() {
  // state goes here
  const [todos, setTodos] = useState([]);

  // function definitions go here

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => {
        if (prevTodo.id === id) todo;
        prevTodo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completeTodo: !prevTodo } : prevTodo
      )
    );
  };

  // useEffect is used to fetch(get) and set data in local storage

  // get data from local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) setTodos(todos);
  }, []);

  // set data in local storag
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>

        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">
              {/* TodoForm goes here */}
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/* loop and add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoContextProvider>
    </>
  );
}

export default App;
