import { Header } from "../header/header";
// IMPORTANDO OUTLET DO REACT-ROUTER-DOM:
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}