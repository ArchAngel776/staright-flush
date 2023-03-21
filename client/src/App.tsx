import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Route } from "./data/enums/Route"
import Login from "./screens/Login"
import Register from "./screens/Register"
import NotFound from "./screens/NotFound"
import "./assets/sass/App.sass"

export default function App(): JSX.Element
{
    const route = createBrowserRouter([
        {
            path: Route.LOGIN,
            element: <Login />
        },
        {
            path: Route.REGISTER,
            element: <Register />
        },
        {
            path: Route.NOT_FOUND,
            element: <NotFound />
        }
    ])

    return <RouterProvider router={route} />
}