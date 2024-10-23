import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
function MainLayouts() {
    return (
        <>
            <Menu />
            <Outlet />
        </>
    );
}

export default MainLayouts;
