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
    IconSortDescending,
    IconTrash,
} from "@tabler/icons-react";
import { Paginator } from "../utils/paginator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    deleteTask,
    fetchTasks,
    selectAllTasks,
} from "../features/tasks/taskSlice";

const TaskList = () => {
    const elements = useSelector(selectAllTasks);
    const [sortvalue, setSortValue] = useState(null);
    const [activePage, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const filtered = elements.filter((element) => {
        return (
            element.title.toLowerCase().includes(search.toLowerCase()) ||
            element.description.toLowerCase().includes(search.toLowerCase())
        );
    });

    const sorted =
        sortvalue !== null
            ? filtered.sort((a, b) => {
                  if (sortvalue === "due") {
                      return new Date(a.due) - new Date(b.due);
                  } else if (sortvalue === "status") {
                      const desiredOrder = [
                          "Pending",
                          "In Progress",
                          "Completed",
                      ];
                      return (
                          desiredOrder.indexOf(a[sortvalue]) -
                          desiredOrder.indexOf(b[sortvalue])
                      );
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
    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    const onDeleteClick = (id) => {
        dispatch(deleteTask(id));
    };
    const rows = data.map((element, index) => (
        <tr key={element._id}>
            <td>{index + 1}</td>
            <td>{element.title}</td>
            <td>{element.description}</td>
            <td>{element.status}</td>
            <td>{new Date(element.due).toLocaleDateString()}</td>
            <td style={{ display: "flex", justifyContent: "flex-start" }}>
                <Link
                    to={`/list/edit/${element._id}`}
                    style={{ textDecoration: "none" }}
                >
                    <ActionIcon variant="default" mr={10}>
                        <IconEdit size="1rem" />
                    </ActionIcon>
                </Link>

                <ActionIcon
                    variant="default"
                    onClick={() => onDeleteClick(element._id)}
                >
                    <IconTrash size="1rem" />
                </ActionIcon>
            </td>
        </tr>
    ));

    return (
        <Container size={"lg"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/list/new" style={{ textDecoration: "none" }}>
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
