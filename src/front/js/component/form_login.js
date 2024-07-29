import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const FormLogin = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  // declarar estados por cada imput
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email == "" || password == "") {
    alert("Debe completar los campos")
    }
    else {
      // console.log(email,password);
      let isLogged = await actions.login(email, password)
      if (isLogged) {
        navigate("/profile")
      }
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

  );
};
