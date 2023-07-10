import * as React from "react";
import ProjectsOverview from "./views/ProjectsOverview";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Project from "./views/Project";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateProject from "./views/CreateProject";
import CreateProjectEntry from "./views/CreateProjectEntry";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProjectsOverview />,
    },
    {
        path: "/:id",
        element: <Project />,
    },
    {
        path: "/add",
        element: <CreateProject />,
    },
    {
        path: ":id/add",
        element: <CreateProjectEntry />,
    },
]);

const queryClient = new QueryClient();

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <header className="bg-gray-900 text-white flex items-center h-12 w-full">
                    <div className="container mx-auto">
                        <a className="navbar-brand" href="/">
                            Timelogger
                        </a>
                    </div>
                </header>

                <main>
                    <div className="container mx-auto">
                        <RouterProvider router={router} />
                    </div>
                </main>
            </QueryClientProvider>
        </>
    );
}

{
    /* <Routes>
<Route path="users">
  <Route path=":userId" element={<ProfilePage />} />
  <Route path="me" element={...} />
</Route>
</Routes> */
}
