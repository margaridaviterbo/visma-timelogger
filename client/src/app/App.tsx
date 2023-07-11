import * as React from "react";
import ProjectsOverview from "./views/ProjectsOverview";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project from "./views/Project";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateProject from "./views/CreateProject/CreateProject";
import CreateProjectEntry from "./views/CreateProjectEntry";

const queryClient = new QueryClient();

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <header className="bg-gray-900 text-white flex items-center h-12 w-full">
                        <div className="container mx-auto">
                            <a className="navbar-brand" href="/">
                                Timelogger
                            </a>
                        </div>
                    </header>

                    <main>
                        <div className="container mx-auto">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<ProjectsOverview />}
                                />
                                <Route path="/:id" element={<Project />} />
                                <Route
                                    path="/add"
                                    element={<CreateProject />}
                                />
                                <Route
                                    path="/:id/add"
                                    element={<CreateProjectEntry />}
                                />
                            </Routes>
                        </div>
                    </main>
                </Router>
            </QueryClientProvider>
        </>
    );
}
