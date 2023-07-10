import React, { ChangeEvent, useState } from "react";
import { createEntry } from "../api/projects";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateProjectEntry() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [duration, setDuration] = useState<number>(30);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{
        description: string[];
        duration: string[];
    }>({ description: [], duration: [] });

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDuration(parseInt(value, 10));
        setErrors((errors) => ({ ...errors, duration: [] }));
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setDescription(value);
        setErrors((errors) => ({ ...errors, description: [] }));
    };

    const handleSubmit = async () => {
        const isValid = validate();
        if (id && isValid) {
            await createEntry(id, description, duration);
            navigate(`/${id}`);
        }
    };

    const addError = (field: "description" | "duration", message: string) => {
        setErrors((errors) => ({
            ...errors,
            [field]: [...errors[field], message],
        }));
    };

    const validate = () => {
        setErrors({ description: [], duration: [] });
        let isValid = true;

        if (!description) {
            addError("description", "Entry description is required.");
            isValid = false;
        }
        if (description?.length > 250) {
            addError("description", "Description too long (max 250 char).");
            isValid = false;
        }
        if (!duration) {
            addError("duration", "Duration is required.");
            isValid = false;
        }
        if (duration < 30) {
            addError("duration", "Duration must be at least 30min.");
            isValid = false;
        }

        return isValid;
    };

    return (
        <>
            <div className="max-w-xl mx-auto my-6 space-y-6 text-slate-900">
                <h1 className="text-3xl font-medium">Create entry</h1>
                <div>
                    <label
                        htmlFor="description"
                        className="block w-full mb-2 font-medium"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        className={`w-full border border-slate-300 rounded-md h-52 px-6 py-3 ${
                            errors.description.length > 0
                                ? "border-red-500"
                                : ""
                        }`}
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                    {errors.description && (
                        <ul>
                            {errors.description.map((error) => (
                                <li
                                    className="text-sm text-red-500 font-medium"
                                    key={error}
                                >
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="duration"
                        className="block w-full mb-2 font-medium"
                    >
                        Duration (minutes)
                    </label>
                    <input
                        id="duration"
                        type="number"
                        min="30"
                        className={`w-full border border-slate-300 rounded-md h-12 px-6 mb-1 ${
                            errors.duration.length > 0 ? "border-red-500" : ""
                        }`}
                        value={duration}
                        onChange={handleDurationChange}
                    />
                    {errors.duration && (
                        <ul>
                            {errors.duration.map((error) => (
                                <li
                                    className="text-sm text-red-500 font-medium"
                                    key={error}
                                >
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 px-4 rounded w-full"
                    onClick={handleSubmit}
                >
                    Create entry
                </button>
            </div>
        </>
    );
}
