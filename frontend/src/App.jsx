import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import Home from "./components/pages/home"
import NotFound from "./components/pages/notFoundpage"
import HomeDesign from "./components/pages/homeDesign"

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomeDesign />
      }
    ]
  }
])

export const App = () => {
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}
