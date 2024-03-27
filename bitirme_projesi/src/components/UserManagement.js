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
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,
    },
    {
        field: 'displayName',
        headerName: 'Display Name',
        width: 200,
        editable: true,
    },
    {
        field: 'isAdmin',
        headerName: 'Is Admin',
        type:"boolean",
        width: 160,
    },
];

const rows = [
//When the database connected it will be filled
];

export default function UserManagement() {
    return (
        <Box sx={{
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
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}