import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Regresar</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
						<Link to="/signup">
							<button className="btn btn-primary">Record</button>
						</Link>
					</Link>

				</div>
			</div>
		</nav>
	);
};
