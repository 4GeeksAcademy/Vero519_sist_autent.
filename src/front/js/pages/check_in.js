import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { SignUp } from "../component/sign_up";
export const CheckIn = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<SignUp/>
		</div>
	);
};
