import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Home from "./Components/Home";
import TodoList from "./Components/TodoList";

export default function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="HOME" value="1" />
          <Tab label="TODOS" value="2" />
        </TabList>
        <TabPanel value="1">
          <Home />
        </TabPanel>
        <TabPanel value="2">
          <TodoList />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
