import React from "react";

interface TableProps<T> {
    headers: { displayName: string; name: string; sortable: boolean }[];
    data: T[];
    onSort?: (direction: "ASC" | "DESC", attribute: string) => void;
    onRowClick?: (row: T) => void;
}

//TIRAR SVGS

export default function Table<T>({
    headers,
    data,
    onSort,
    onRowClick,
}: TableProps<T>) {
    return (
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    {headers.map((header, i) => (
                        <th key={i} className="border px-4 py-2">
                            {header.displayName}
                            {header.sortable && onSort && (
                                <>
                                    <button
                                        onClick={() =>
                                            onSort("ASC", header.name)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() =>
                                            onSort("DESC", header.name)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                                            />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr
                        key={i}
                        onClick={() => {
                            onRowClick && onRowClick(row);
                        }}
                    >
                        {headers.map((header, j) => (
                            <td key={j} className="border px-4 py-2">
                                {row[header.name]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
