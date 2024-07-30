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
		<nav className="navbar navbar-light bg-light opacity-50">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Inicio</span>
				</Link>
				<div className="ml-auto">
					{!store.auth ?
					 (<>
					 <Link to="/login">
						<button className="btn btn-primary me-3">Login</button>
					</Link>
					<Link to="/signup">
						<button  className="btn btn-primary">Registrarse</button>
					</Link>
					 </>) : 
					(<>
					<Link to="/profile">
						<button  className="btn btn-primary me-3">Perfil</button>
					</Link>
					<Link to="/">
						<button onClick={handleLogout} className="btn btn-danger ">Log out</button>
					</Link>
					</>)
					}
					 
				</div>
			</div>
		</nav>
	);
};
