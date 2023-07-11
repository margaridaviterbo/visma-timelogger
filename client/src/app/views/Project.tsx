import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Duration } from "luxon";
import { getById } from "../api/projects";
import Table from "../components/Table";
// @ts-ignore
import { ReactComponent as Spinner } from "../assets/Spinner.svg";

const headers = [
    { name: "createdAt", displayName: "Date", sortable: true },
    { name: "duration", displayName: "Duration (hh:mm)", sortable: true },
    { name: "description", displayName: "Description", sortable: false },
];

export default function Project() {
    const { id } = useParams();
    const { data, isFetching } = useQuery("project", () =>
        id ? getById(id) : undefined
    );
    const [sort, setSort] = useState<string>();

    const displayData = data && {
        ...data,
        totalTime: Duration.fromObject({
            minutes: data.totalTime,
        }).toFormat("hh:mm"),
        deadline: new Date(data.deadline!).toDateString(),
        completed: data.completed ? "Completed" : "In progress",
    };

    const displayEntriesData = data?.entries
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
                minutes: entry.duration,
            }).toFormat("hh:mm"),
            createdAt: new Date(entry.createdAt).toDateString(),
        }));

    const onSort = (direction: "ASC" | "DESC", attribute: string) => {
        setSort(`${attribute} ${direction}`);
    };

    return (
        <div className="space-y-6 my-6">
            {isFetching ? (
                <Spinner />
            ) : (
                <>
                    {data && displayData && (
                        <>
                            <div className="space-y-3 flex items-center justify-between">
                                <h1 className="text-3xl font-medium">
                                    {displayData.name}
                                </h1>
                                {!data.completed && (
                                    <div className="flex items-center my-6">
                                        <div className="w-1/2">
                                            <Link
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
                                                to={"add"}
                                            >
                                                Add Entry
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p>
                                    <span className="font-medium">Status:</span>{" "}
                                    {displayData.completed}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Deadline:
                                    </span>{" "}
                                    {displayData.deadline}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Total time:
                                    </span>{" "}
                                    {displayData.totalTime}
                                </p>
                            </div>
                        </>
                    )}

                    {displayEntriesData && (
                        <Table
                            headers={headers}
                            data={displayEntriesData}
                            onSort={onSort}
                        />
                    )}
                </>
            )}
        </div>
    );
}
