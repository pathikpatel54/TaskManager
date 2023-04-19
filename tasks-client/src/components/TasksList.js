import { Container, Input, Table } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const elements = [
    {
        no: "1",
        name: "Sample Task",
        description: "Sample Task Description",
        status: "In Progress",
        due: "23/10/1995",
    },
];

const TaskList = () => {
    const rows = elements.map((element) => (
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
            <Input
                icon={<IconSearch />}
                placeholder="Search"
                maw={200}
                mb={20}
            />
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
        </Container>
    );
};

export default TaskList;
