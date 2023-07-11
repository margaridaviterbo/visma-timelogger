import React from "react";
// @ts-ignore
import { ReactComponent as AscIcon } from "../assets/AscIcon.svg";
// @ts-ignore
import { ReactComponent as DescIcon } from "../assets/DescIcon.svg";

interface TableProps<T> {
    headers: { displayName: string; name: string; sortable: boolean }[];
    data: T[];
    onSort?: (direction: "ASC" | "DESC", attribute: string) => void;
    onRowClick?: (row: T) => void;
}

export default function Table<T>({
    headers,
    data,
    onSort,
    onRowClick,
}: TableProps<T>) {
    const tableHeader = (
        <thead className="bg-gray-200">
            <tr>
                {headers.map((header, i) => (
                    <th key={i} className="border px-4 py-2">
                        <div className="flex items-center justify-between">
                            {header.displayName}
                            {header.sortable && onSort && (
                                <div className="flex items-center">
                                    <button
                                        className="text-slate-600 hover:text-slate-900"
                                        onClick={() =>
                                            onSort("ASC", header.name)
                                        }
                                    >
                                        <AscIcon />
                                    </button>
                                    <button
                                        className="text-slate-600 hover:text-slate-900"
                                        onClick={() =>
                                            onSort("DESC", header.name)
                                        }
                                    >
                                        <DescIcon />
                                    </button>
                                </div>
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );

    return (
        <table className="table-fixed w-full">
            {tableHeader}
            <tbody>
                {data.map((row, i) => (
                    <tr
                        key={i}
                        onClick={() => {
                            onRowClick && onRowClick(row);
                        }}
                        className={`${
                            onRowClick
                                ? "hover:bg-slate-100 cursor-pointer"
                                : ""
                        }`}
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
