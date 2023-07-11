import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { useQuery } from "react-query";
import { Duration } from "luxon";
import { getAll } from "../api/projects";
// @ts-ignore
import { ReactComponent as Spinner } from "../assets/Spinner.svg";

const headers = [
    { name: "id", displayName: "#", sortable: false },
    { name: "name", displayName: "Project", sortable: false },
    { name: "totalTime", displayName: "Total Time (hh:mm)", sortable: true },
    { name: "deadline", displayName: "Deadline", sortable: true },
    { name: "completed", displayName: "Status", sortable: false },
];

export default function ProjectsOverview() {
    const navigate = useNavigate();

    const { data, isFetching, error, isError } = useQuery("projects", getAll, {
        retry: 1,
    });
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
                minutes: entry.totalTime,
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
            </div>
            {isFetching ? (
                <div>
                    <h1>Loading Projects</h1>
                    <Spinner />
                </div>
            ) : (
                displayData && (
                    <Table
                        headers={headers}
                        data={displayData}
                        onSort={onSort}
                        onRowClick={onRowClick}
                    />
                )
            )}
            {isError && (
                <p className="text-md text-red-500 font-medium">
                    {(error as Error).message}
                </p>
            )}
        </>
    );
}
