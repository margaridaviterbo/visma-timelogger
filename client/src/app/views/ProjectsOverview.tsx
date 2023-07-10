import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { useQuery } from "react-query";
import { Duration } from "luxon";
import { getAll } from "../api/projects";

const headers = [
    { name: "id", displayName: "#", sortable: false },
    { name: "name", displayName: "Project", sortable: false },
    { name: "totalTime", displayName: "Total Time Spent", sortable: true },
    { name: "deadline", displayName: "Deadline", sortable: true },
    { name: "completed", displayName: "Status", sortable: false },
];

export default function ProjectsOverview() {
    const navigate = useNavigate();
    const { data } = useQuery("projects", getAll);
    const [sort, setSort] = useState<string>();

    const displayData = data
        ?.sort((a, b) => {
            if (sort === "deadline ASC") {
                return a.deadline < b.deadline ? -1 : 1;
            }
            if (sort === "deadline DESC") {
                return a.deadline > b.deadline ? -1 : 1;
            }
            if (sort === "totalTime ASC") {
                return a.totalTime < b.totalTime ? -1 : 1;
            }
            if (sort === "totalTime DESC") {
                return a.totalTime > b.totalTime ? -1 : 1;
            }
            return 0;
        })
        .map((entry) => ({
            ...entry,
            totalTime: Duration.fromObject({
                seconds: entry.totalTime,
            }).toFormat("hh:mm"),
            deadline: new Date(entry.deadline).toDateString(),
            completed: entry.completed ? "Completed" : "In progress",
        }));

    const onSort = (direction: "ASC" | "DESC", attribute: string) => {
        setSort(`${attribute} ${direction}`);
    };

    const onRowClick = ({ id }: { id: string }) => {
        navigate(`/${id}`);
    };

    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <Link
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        to={"/add"}
                    >
                        Add Project
                    </Link>
                </div>

                <div className="w-1/2 flex justify-end">
                    <form>
                        <input
                            className="border rounded-full py-2 px-4"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
            {/* isLoagins then spinner */}
            {displayData && (
                <Table
                    headers={headers}
                    data={displayData}
                    onSort={onSort}
                    onRowClick={onRowClick}
                />
            )}
        </>
    );
}
