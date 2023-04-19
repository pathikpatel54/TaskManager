import {
    Button,
    Center,
    Container,
    Input,
    Pagination,
    Space,
    Table,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Paginator } from "../utils/paginator";
import { useState } from "react";

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
];

const TaskList = () => {
    const [activePage, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, total_pages } = Paginator(
        elements.filter((el) =>
            el.name.toLowerCase().includes(search.toLowerCase())
        ),
        activePage,
        5
    );

    const rows = data.map((element) => (
        <tr key={element.name}>
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
                <Button>Add Task</Button>
                <Input
                    rightSection={<IconSearch size={20} />}
                    placeholder="Search"
                    maw={200}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Space h={"xl"} />
            <Table striped withBorder withColumnBorders>
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
            <Center>
                <Pagination
                    value={activePage}
                    onChange={setPage}
                    total={total_pages}
                />
            </Center>
        </Container>
    );
};

export default TaskList;
