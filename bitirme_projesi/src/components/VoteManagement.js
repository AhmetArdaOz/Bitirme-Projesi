import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  {
    field: "user_id",
    headerName: "User ID",
    width: 200,
    editable: true,
  },
  {
    field: "movie_id",
    headerName: "Movie ID",
    width: 200,
    editable: true,
  },
  {
    field: "vote",
    headerName: "Vote",
    width: 200,
    editable: true,
  },
];

export default function VoteManagement() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/votes");
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching votes:", error);
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  const handleEditCellChange = async (params) => {
    const { id, field, value } = params;

    const updatedRow = rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow[field] = value;

      try {
        await axios.put(`http://localhost:3000/api/v1/votes/${id}`, updatedRow);
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === id ? updatedRow : row))
        );
      } catch (error) {
        console.error("Error updating vote:", error);
      }
    }
  };

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
        pageSizeOptions={[5]}
        loading={loading}
        disableRowSelectionOnClick
        onCellEditCommit={handleEditCellChange}
      />
    </Box>
  );
}
