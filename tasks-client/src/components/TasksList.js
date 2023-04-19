import { Container, Table } from "@mantine/core";

const elements = [
    {
        name: "Sample Task",
        description: "Sample Task Description",
        status: "In Progress",
        due: "23/10/1995",
    },
];

const TaskList = () => {
    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>{element.status}</td>
            <td>{element.due}</td>
        </tr>
    ));

    return (
        <Container size={"lg"}>
            <Table striped withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Element position</th>
                        <th>Element name</th>
                        <th>Symbol</th>
                        <th>Atomic mass</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Container>
    );
};

export default TaskList;
