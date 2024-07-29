import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const recordUser = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  // declarar estados por cada imput
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRecord = async (e) => {
    e.preventDefault()
    if (email == "" || password == "") {
      alert("Debe completar los campos")
    }
    else {
      // console.log(email,password);
      let isRecord = await actions.record(email, password)
      if (isRecord) {
        navigate("/signup")
      }
    }
  }
  return (
    <form onSubmit={handleRecord}>
      <div className="Form text-center mt-5">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  )
}
