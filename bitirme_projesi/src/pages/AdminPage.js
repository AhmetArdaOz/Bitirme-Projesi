import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import UserManagement from "../components/UserManagement";
import MovieManagement from "../components/MovieManagement";
import FeedbackManagement from "../components/FeedbackManagement";
import NotDefinedManagement from "../components/NotDefinedManagement";

export default function AdminPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <h2 style={{ color: "white", marginLeft: 20,marginTop:"100px" }}>Admin Page</h2>
            <Box sx={{ width: "100%",marginTop:"50px"}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Movie Management" style={{ color: "white" }} />
                    <Tab label="User Management" style={{ color: "white" }} />
                    <Tab label="NotDefined Management" style={{ color: "white" }} />
                    <Tab label="Feedback Management" style={{ color: "white" }} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <MovieManagement />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserManagement />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <NotDefinedManagement />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <FeedbackManagement />
            </TabPanel>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
