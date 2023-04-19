import {
    Button,
    Center,
    Container,
    Input,
    Pagination,
    Select,
    Space,
    Table,
} from "@mantine/core";
import {
    IconSearch,
    IconSortAscending,
    IconSortDescending,
} from "@tabler/icons-react";
import { Paginator } from "../utils/paginator";
import { useState } from "react";

const TaskList = () => {
    const elements = [
        {
            no: "1",
            name: "Sample Task",
            description: "Sample Task Description",
            status: "In Progress",
            due: "23/10/1995",
        },
        {
            no: "2",
            name: "Another Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "3",
            name: "Yet Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "4",
            name: "Yet Another Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "5",
            name: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "6",
            name: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "7",
            name: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "8",
            name: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "9",
            name: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "10",
            name: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
        {
            no: "11",
            name: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "23/10/1995",
        },
    ];
    const [sortvalue, setSortValue] = useState("");
    const [activePage, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, total_pages } = Paginator(elements.filter((element) => {
        return element.name.toLowerCase().includes(search.toLowerCase());
    }), activePage);
    console.log(data);
    const rows = data.map((element) => (
        <tr key={element.no}>
            <td>{element.no}</td>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>{element.status}</td>
            <td>{element.due}</td>
        </tr>
    ));

    return (
        <Container size={"lg"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button>Add New Task</Button>
                <Select
                    icon={<IconSortDescending />}
                    value={sortvalue}
                    onChange={setSortValue}
                    placeholder="Sort by"
                    data={[
                        { value: "title", label: "Title" },
                        { value: "status", label: "Status" },
                        { value: "duedate", label: "Due Date" },
                    ]}
                />
                <Input
                    rightSection={<IconSearch size={20} />}
                    placeholder="Search"
                    maw={200}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Space h={"xl"} />
            <Table striped withBorder withColumnBorders highlightOnHover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due date</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <Space h={"xl"} />
            {elements.length > 10 ? (
                <Center>
                    <Pagination
                        value={activePage}
                        onChange={setPage}
                        total={total_pages}
                    />
                </Center>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default TaskList;
