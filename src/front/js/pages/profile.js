import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getProfile()
    }, [])
    return (
        <div className="Profile text-center mt-5">
            <h1>Tus recetas</h1>
            <div className="container">
            </div>
        </div>
    )
}
