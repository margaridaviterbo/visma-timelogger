import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Duration } from "luxon";
import { getById } from "../api/projects";
import Table from "../components/Table";

const headers = [
    { name: "createdAt", displayName: "Date", sortable: true },
    { name: "duration", displayName: "Duration", sortable: true },
    { name: "description", displayName: "Description", sortable: false },
];

export default function Project() {
    const { id } = useParams();
    const { data } = useQuery("project", () => (id ? getById(id) : undefined));
    const [sort, setSort] = useState<string>();

    const displayData = data?.entries
        .sort((a, b) => {
            if (sort === "createdAt ASC") {
                return a.createdAt < b.createdAt ? -1 : 1;
            }
            if (sort === "createdAt DESC") {
                return a.createdAt > b.createdAt ? -1 : 1;
            }
            if (sort === "duration ASC") {
                return a.duration < b.duration ? -1 : 1;
            }
            if (sort === "duration DESC") {
                return a.duration > b.duration ? -1 : 1;
            }
            return 0;
        })
        .map((entry) => ({
            ...entry,
            duration: Duration.fromObject({
                seconds: entry.duration,
            }).toFormat("hh:mm:ss"),
            createdAt: new Date(entry.createdAt).toDateString(),
        }));

    const onSort = (direction: "ASC" | "DESC", attribute: string) => {
        setSort(`${attribute} ${direction}`);
    };

    return (
        <>
            {data && (
                <>
                    <h1>{data.name}</h1>
                    <p>
                        Status: {data.completed ? "Completed" : "In porgress"}
                    </p>
                    <p>Deadline: {new Date(data.deadline!).toDateString()}</p>
                    {!data.completed && (
                        <div className="flex items-center my-6">
                            <div className="w-1/2">
                                <Link
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    to={"add"}
                                >
                                    Add Entry
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* isLoagins then spinner */}
            {displayData && (
                <Table headers={headers} data={displayData} onSort={onSort} />
            )}
        </>
    );
}
