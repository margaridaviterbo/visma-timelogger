import React, { ChangeEvent, useState } from "react";
import { create } from "../api/projects";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [errors, setErrors] = useState<{
        name: string[];
        deadline: string[];
    }>({ name: [], deadline: [] });

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);
        setErrors((errors) => ({ ...errors, name: [] }));
    };

    const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDeadline(value);
        setErrors((errors) => ({ ...errors, deadline: [] }));
    };

    const handleSubmit = async () => {
        const isValid = validate();
        if (isValid) {
            const id = await create(name, deadline);
            navigate(`/${id}`);
        }
    };

    const addError = (field: "name" | "deadline", message: string) => {
        setErrors((errors) => ({
            ...errors,
            [field]: [...errors[field], message],
        }));
    };

    const validate = () => {
        setErrors({ name: [], deadline: [] });
        let isValid = true;

        if (!name) {
            addError("name", "Project name is required.");
            isValid = false;
        }
        if (name?.length > 100) {
            addError("name", "Project name too long (max 100 char).");
            isValid = false;
        }
        if (!deadline) {
            addError("deadline", "Project deadline is required.");
            isValid = false;
        }
        if (deadline && new Date(deadline) < new Date(Date.now())) {
            addError("deadline", "Project deadline can't be in the past.");
            isValid = false;
        }

        return isValid;
    };

    const getErrorComponent = (inputField: string) => (
        <ul>
            {errors[inputField].map((error: string) => (
                <li className="text-sm text-red-500 font-medium" key={error}>
                    {error}
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <div className="max-w-xl mx-auto my-6 space-y-6 text-slate-900">
                <h1 className="text-3xl font-medium">Create project</h1>
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="block w-full mb-2 font-medium"
                    >
                        Project Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className={`w-full border border-slate-300 rounded-md h-12 px-6 mb-1 ${
                            errors.name.length > 0 ? "border-red-500" : ""
                        }`}
                        value={name}
                        onChange={handleNameChange}
                    />
                    {errors.name && getErrorComponent("name")}
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="deadline"
                        className="block w-full mb-2 font-medium"
                    >
                        Project Deadline
                    </label>
                    <input
                        id="deadline"
                        type="date"
                        className={`w-full border border-slate-300 rounded-md h-12 px-6 mb-1 ${
                            errors.deadline.length > 0 ? "border-red-500" : ""
                        }`}
                        value={deadline}
                        onChange={handleDeadlineChange}
                    />
                    {errors.deadline && getErrorComponent("deadline")}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 px-4 rounded w-full"
                    onClick={handleSubmit}
                >
                    Create project
                </button>
            </div>
        </>
    );
}
