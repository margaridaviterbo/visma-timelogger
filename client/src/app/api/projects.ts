// const BASE_URL = "http://localhost:3001/api";

import { Entry, Project, initialEntries, initialProjects } from "./db";

const loadProjects = () =>
    JSON.parse(
        localStorage.getItem("projects") || JSON.stringify(initialProjects)
    );
const saveProjects = () =>
    localStorage.setItem("projects", JSON.stringify(projects));

const loadEntries = () =>
    JSON.parse(
        localStorage.getItem("entries") || JSON.stringify(initialEntries)
    );
const saveEntries = () =>
    localStorage.setItem("entries", JSON.stringify(entries));

const projects: Project[] = loadProjects();

const entries: Entry[] = loadEntries();

export async function getAll() {
    // const response = await fetch(`${BASE_URL}/projects`);
    // return response.json();

    await new Promise((resolve) => setTimeout(resolve, 200)); // simulate API response time~
    // throw new Error("Couldn't fetch projects."); //simulate api error
    return projects.map((project) => {
        const totalTime = entries
            .filter((entry) => entry.projectId === project.id)
            .reduce((total, entry) => total + entry.duration, 0);
        return { ...project, totalTime };
    });
}

export async function create(name: string, deadline: string) {
    const newProject = {
        id: crypto.randomUUID(),
        name,
        deadline,
        completed: false,
    };

    projects.push(newProject);
    saveProjects();
    return newProject.id;
}

export async function getById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200)); // simulate API response time
    const projectEntries = entries.filter((entry) => entry.projectId === id);
    const totalTime = projectEntries.reduce(
        (total, entry) => total + entry.duration,
        0
    );
    const project = projects.find((project) => project.id === id);

    return { ...project, totalTime, entries: projectEntries };
}

export async function createEntry(
    projectId: string,
    description: string,
    duration: number
) {
    const newEntry = {
        id: crypto.randomUUID(),
        projectId,
        createdAt: new Date(Date.now()).toISOString(),
        duration,
        description,
    };

    entries.push(newEntry);
    saveEntries();
    return newEntry.id;
}
