import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";

export const Home = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		// actions.getProfile()
	}, [])
	return (
		<div className="container-fluid">
			
			<div className="text-center mt-5">
				<h1>Bienvenido!!</h1>
				<div className="container card mb-3" style={{ maxWidth: "540px" }} />
				<div className="row g-0">
					<div className="col-md-4">
						<img src="https://www.recetasnestle.com.ar/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/ee1832aaac545c62dd99e36a3b117856.jpg?itok=5XCyMjHf" className="img-fluid rounded-start" alt="..." />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">Recetas</h5>
							<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
							<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
