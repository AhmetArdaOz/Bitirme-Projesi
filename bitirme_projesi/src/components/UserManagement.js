import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/users");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: true,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      width: 160,
      editable: true,
    },
    {
      field: "isvisited",
      headerName: "Is Visited",
      type: "boolean",
      width: 160,
      renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        sx={{ background: "white" }}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10]}
        pagination
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default UserManagement;
