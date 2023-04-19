import {
    ActionIcon,
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
    IconEdit,
    IconSearch,
    IconSettings,
    IconSortDescending,
    IconTrash,
} from "@tabler/icons-react";
import { Paginator } from "../utils/paginator";
import { useState } from "react";
import { Tooltip } from "tabler-icons-react";
import { Link } from "react-router-dom";

const TaskList = () => {
    const elements = [
        {
            no: "1",
            title: "Sample Task",
            description: "Sample Task Description",
            status: "In Progress",
            due: "10-22-1995",
        },
        {
            no: "2",
            title: "Another Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "3",
            title: "Yet Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "4",
            title: "Yet Another Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "5",
            title: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "6",
            title: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "7",
            title: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "8",
            title: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "9",
            title: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-22-1995",
        },
        {
            no: "10",
            title: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-20-1995",
        },
        {
            no: "11",
            title: "Task",
            description: "Another Task Description",
            status: "Completed",
            due: "10-21-1993",
        },
    ];
    const [sortvalue, setSortValue] = useState(null);
    const [activePage, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const filtered = elements.filter((element) => {
        return element.title.toLowerCase().includes(search.toLowerCase());
    });
    console.log(sortvalue);
    const sorted =
        sortvalue !== null
            ? filtered.sort((a, b) => {
                  if (sortvalue === "due") {
                      return new Date(a.due) - new Date(b.due);
                  } else {
                      let x = a[sortvalue].toLowerCase();
                      let y = b[sortvalue].toLowerCase();
                      if (x < y) {
                          return -1;
                      }
                      if (x > y) {
                          return 1;
                      }
                      return 0;
                  }
              })
            : filtered;

    const { data, total_pages } = Paginator(sorted, activePage);
    console.log(data);
    const rows = data.map((element) => (
        <tr key={element.no}>
            <td>{element.no}</td>
            <td>{element.title}</td>
            <td>{element.description}</td>
            <td>{element.status}</td>
            <td>{element.due}</td>
            <td style={{ display: "flex", justifyContent: "flex-start" }}>
                <ActionIcon variant="default" mr={10}>
                    <IconEdit size="1rem" />
                </ActionIcon>

                <ActionIcon variant="default">
                    <IconTrash size="1rem" />
                </ActionIcon>
            </td>
        </tr>
    ));

    return (
        <Container size={"lg"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/listnew" style={{ textDecoration: "none" }}>
                    <Button>Add New Task</Button>
                </Link>
                <Select
                    clearable
                    icon={<IconSortDescending />}
                    value={sortvalue}
                    onChange={setSortValue}
                    placeholder="Sort by"
                    data={[
                        { value: "title", label: "Title" },
                        { value: "status", label: "Status" },
                        { value: "due", label: "Due Date" },
                    ]}
                />
                {console.log(sortvalue)}
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
                        <th>Actions</th>
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
