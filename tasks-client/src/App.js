import { Container, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import TaskList from "./components/TasksList";
import TaskForm from "./components/TaskForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuth } from "./features/auth/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuth());
    }, []);

    return (
        <MantineProvider
            theme={{ colorScheme: "dark" }}
            withGlobalStyles
            withNormalizeCSS
        >
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Container size={"lg"}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/list" element={<TaskList />} />
                            <Route path="/listnew" element={<TaskForm />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </div>
        </MantineProvider>
    );
}

export default App;
