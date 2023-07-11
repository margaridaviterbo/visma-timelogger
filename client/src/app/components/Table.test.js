import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/dom";
import Table from "./Table";

const tableProps = {
    headers: [
        { displayName: "header 1", name: "header1", sortable: false },
        { displayName: "header 2", name: "header2", sortable: true },
    ],
    data: [
        { header1: "hello", header2: "world" },
        { header1: "ola", header2: "mundo" },
    ],
};

describe("Table component", () => {
    it("renders table rows with data", () => {
        render(<Table {...tableProps} />);

        expect(screen.getByText("header 1")).toBeInTheDocument();
        expect(screen.getByText("header 2")).toBeInTheDocument();
        expect(screen.getAllByTestId("table-row").length).toBe(2);
    });

    it("renders header with sort buttons if sortable and calls onSort", async () => {
        const onSortMock = jest.fn();
        const newProps = {
            ...tableProps,
            onSort: onSortMock,
        };

        render(<Table {...newProps} />);

        const firstHeader = screen.getByText("header 1");
        const secondHeader = screen.getByText("header 2");

        expect(
            within(firstHeader).queryAllByRole("button", {
                container: firstHeader,
            }).length
        ).toBe(0);
        expect(
            within(secondHeader).queryAllByRole("button", {
                container: secondHeader,
            }).length
        ).toBe(2);

        userEvent.click(
            within(secondHeader).queryAllByRole("button", {
                container: secondHeader,
            })[0]
        );

        await waitFor(() => {
            expect(onSortMock).toHaveBeenCalled();
        });
    });

    it("calls onRowCLick if the prop is passed and a user clicks a row", async () => {
        const onRowCLickMock = jest.fn();
        const newProps = {
            ...tableProps,
            onRowClick: onRowCLickMock,
        };

        render(<Table {...newProps} />);

        userEvent.click(screen.getAllByTestId("table-row")[0]);

        await waitFor(() => {
            expect(onRowCLickMock).toHaveBeenCalled();
        });
    });
});
