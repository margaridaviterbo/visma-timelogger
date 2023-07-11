export interface Project {
    id: string;
    name: string;
    deadline: string;
    completed: boolean;
}

export interface Entry {
    id: string;
    projectId: string;
    duration: number;
    createdAt: string;
    description: string;
}

export const initialProjects: Project[] = [
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

export const initialEntries: Entry[] = [
    {
        id: "100",
        projectId: "201",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 3943,
        description: "blu blu blu",
    },
    {
        id: "101",
        projectId: "201",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 360043,
        description: "ble ble ble",
    },
    {
        id: "102",
        projectId: "202",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 39043,
        description: "bla bla bla",
    },
    {
        id: "103",
        projectId: "202",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 360043,
        description: "blo blo blo",
    },
    {
        id: "104",
        projectId: "203",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 3043,
        description: "bli bli bli",
    },
    {
        id: "105",
        projectId: "203",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 360003,
        description: "ble ble ble",
    },
    {
        id: "106",
        projectId: "204",
        createdAt: "2023-07-10T14:07:20.089Z",
        duration: 39043,
        description: "bla bla bla",
    },
    {
        id: "107",
        projectId: "204",
        createdAt: "2022-07-10T14:07:20.089Z",
        duration: 36043,
        description: "ble ble ble",
    },
];
