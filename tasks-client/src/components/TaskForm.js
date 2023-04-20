import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Textarea, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addTask,
    selectAllTasks,
    updateTask,
} from "../features/tasks/taskSlice";
import { useEffect } from "react";

const TaskForm = () => {
    let { id } = useParams();
    const task = useSelector(selectAllTasks).find((task) => task._id == id);
    const form = useForm({
        initialValues: {
            title: task?.title,
            description: task?.description,
            status: task?.status,
            due: task?.due ? new Date(task?.due) : new Date(),
        },

        // functions will be used to validate values at corresponding key
        validate: {
            title: (value) =>
                value.length < 2 ? "Title must have at least 2 letters" : null,
            description: (value) =>
                value.length < 2
                    ? "Description must have at least 2 letters"
                    : null,
            status: (value) => (value.length < 2 ? "Status invalid" : null),
            due: (value) =>
                value < 18 ? "You must be at least 18 to register" : null,
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFormSubmit = (task) => {
        if (id) {
            task._id = id;
            dispatch(updateTask(task));
        } else {
            dispatch(addTask(task));
        }
        navigate("/");
    };

    useEffect(() => {
        form.setValues({
            title: task?.title,
            description: task?.description,
            status: task?.status,
            due: task?.due ? new Date(task?.due) : new Date(),
        });
    }, [task]);

    return (
        <Box maw={320} mx="auto">
            <form onSubmit={form.onSubmit(onFormSubmit)}>
                <TextInput
                    label="Title"
                    placeholder="Title"
                    {...form.getInputProps("title")}
                />
                <Textarea
                    mt="sm"
                    label="Description"
                    placeholder="Description"
                    autosize
                    minRows={2}
                    {...form.getInputProps("description")}
                />
                <Select
                    mt="sm"
                    clearable
                    placeholder="Status"
                    label="Status"
                    data={[
                        { value: "In Progress", label: "In Progress" },
                        { value: "Completed", label: "Completed" },
                        { value: "Pending", label: "Pending" },
                    ]}
                    {...form.getInputProps("status")}
                />
                <DatePickerInput
                    defaultValue={new Date()}
                    label="Due Date"
                    mt="sm"
                    placeholder="Due Date"
                    {...form.getInputProps("due")}
                />
                <Button type="submit" mt="lg" fullWidth>
                    Submit
                </Button>
                <Link to="/list" style={{ textDecoration: "none" }}>
                    <Button type="submit" mt="sm" fullWidth variant="default">
                        Cancel
                    </Button>
                </Link>
            </form>
        </Box>
    );
};

export default TaskForm;
