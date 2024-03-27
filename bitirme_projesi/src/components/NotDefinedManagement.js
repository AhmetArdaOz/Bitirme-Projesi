import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        editable: true,
    },
    {
        field: 'movieId',
        headerName: 'Movie Id',
        width: 250,
        editable: true,
    },
    {
        field: 'movieSomething',
        headerName: 'Movie Something',
        width: 200,
        editable: true,
    },
    {
        field: 'movieTitle',
        headerName: 'Movie Title',
        width: 160,
        editable:true
    },
    {
        field: 'userName',
        headerName: 'User Name',
        width: 200,
        editable: true,
    },
];

const rows = [
//When the database connected it will be filled
];

export default function NotDefinedManagement() {
    return (
        <Box  sx={{
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
                sx={{background:"white"}}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
} 