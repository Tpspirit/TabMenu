import "./App.css";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TodoList from "./TodoList";

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My todos</Typography>
        </Toolbar>
      </AppBar>
      <TodoList />
    </Container>
  );
}

export default App;
