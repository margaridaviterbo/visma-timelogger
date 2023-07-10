// const BASE_URL = "http://localhost:3001/api";

//meter harcoded data numa db
//meter tipos e ficheiros de tipos

// let projectID = 0;

let entryID = 0;

interface Project {
    id: string;
    name: string;
    deadline: string;
    completed: boolean;
}

interface Entry {
    id: string;
    projectId: string;
    duration: number;
    createdAt: string;
    description: string;
}

const initialProjects: Project[] = [
    {
        id: "201",
        name: "Project 1",
        deadline: "2023-07-10T14:07:20.089Z",
        completed: true,
    },
    {
        id: "202",
        name: "Project 2",
        deadline: "2022-07-10T14:07:20.089Z",
        completed: false,
    },
    {
        id: "203",
        name: "Project 3",
        deadline: "2023-02-10T14:07:20.089Z",
        completed: true,
    },
    {
        id: "204",
        name: "Project 4",
        deadline: "2023-07-05T14:07:20.089Z",
        completed: false,
    },
];

const initialEntries: Entry[] = [
    {
        id: "100",
        projectId: "201",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 390043,
        description: "blu blu blu",
    },
    {
        id: "101",
        projectId: "201",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 36000043,
        description: "ble ble ble",
    },
    {
        id: "102",
        projectId: "202",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 390043,
        description: "bla bla bla",
    },
    {
        id: "103",
        projectId: "202",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 36000043,
        description: "blo blo blo",
    },
    {
        id: "104",
        projectId: "203",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 390043,
        description: "bli bli bli",
    },
    {
        id: "105",
        projectId: "203",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 36000043,
        description: "ble ble ble",
    },
    {
        id: "106",
        projectId: "204",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 390043,
        description: "bla bla bla",
    },
    {
        id: "107",
        projectId: "204",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 36000043,
        description: "ble ble ble",
    },
];

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
    return projects.map((project) => {
        const totalTime = entries
            .filter((entry) => entry.projectId === project.id)
            .reduce((total, entry) => total + entry.duration, 0);
        return { ...project, totalTime };
    });
}

export async function create(name: string, deadline: string) {
    const newProject = {
        // id: `${++projectID}`,
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
        id: `${++entryID}`,
        projectId,
        createdAt: new Date(Date.now()).toISOString(),
        duration,
        description,
    };

    entries.push(newEntry);
    saveEntries();
    return newEntry.id;
}
