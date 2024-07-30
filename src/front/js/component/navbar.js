import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const handleLogout=()=>{
		actions.logout()
	}
	useEffect(()=>{
	actions.getProfile()
	},[])
console.log(store.auth);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Regresar</span>
				</Link>
				<div className="ml-auto">
					{!store.auth ?
					 (<Link to="/login">
						<button className="btn btn-primary me-3">Login</button>
					</Link>) : 
					(<Link to="/">
						<button onClick={handleLogout} className="btn btn-primary me-3">Log out</button>
					</Link>)
					}
					 <Link to="/signup">
						<button  className="btn btn-primary">Registrarse</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
