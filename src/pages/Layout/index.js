import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <Outlet />
            我是Layout
        </div>
    )
}