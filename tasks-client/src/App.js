import { Container, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import TaskList from "./components/TasksList";

function App() {
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
                        </Routes>
                    </Container>
                </BrowserRouter>
            </div>
        </MantineProvider>
    );
}

export default App;
