import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CreateProject from "./CreateProject";

describe("Create project view", () => {
    it("renders two input fields and button", () => {
        render(
            <MemoryRouter>
                <CreateProject />
            </MemoryRouter>
        );

        expect(screen.getByText("Project Name")).toBeInTheDocument();
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByText("Project Deadline")).toBeInTheDocument();
        expect(screen.getByTestId("deadline-input")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("clicking the create button with empty fields shows error on both fields", async () => {
        render(
            <MemoryRouter>
                <CreateProject />
            </MemoryRouter>
        );

        userEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(
                screen.getByText("Project name is required.")
            ).toBeInTheDocument();
            expect(
                screen.getByText("Project deadline is required.")
            ).toBeInTheDocument();
        });
    });

    it("shows errors when project name too long or project deadline in the past when user clicks create button", async () => {
        render(
            <MemoryRouter>
                <CreateProject />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId("name-input"), {
            target: {
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            },
        });
        fireEvent.change(screen.getByTestId("deadline-input"), {
            target: { value: "2020-04-26" },
        });
        userEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(
                screen.getByText("Project name too long (max 100 char).")
            ).toBeInTheDocument();
            expect(
                screen.getByText("Project deadline can't be in the past.")
            ).toBeInTheDocument();
        });
    });
});
