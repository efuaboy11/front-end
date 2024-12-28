import { Navigate, useLocation } from "react-router-dom";
import { useAccess } from "../context/accessContext";
import { routeDependencies } from "./routeDependencies";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({element: Component, path, isMandatory=false}) =>{
    const {visitedRoutes, addRoute} = useAccess();
    const location = useLocation();


    const prerequisites  = routeDependencies[path] || []
    const hasAccess = isMandatory
    ? prerequisites.every((prerequisite) => visitedRoutes.includes(prerequisite)) // All prerequisites must be met
    : prerequisites.some((prerequisite) => visitedRoutes.includes(prerequisite)); // At least one prerequisite must be met


    useEffect(() => {
        addRoute(path);
      }, [path]);

    return hasAccess ? (
        <Component />
    ):(
        <Navigate to="/admin/home"/>
    )
  

}


