import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ITask, ITaskOfWorkspace } from "pages/Workspace/detail";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
    //     { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    { field: "task", headerName: "Task", width: 400 },
    {
        field: "createdAt",
        headerName: "Created at",
        // type: "date",
        width: 250,
    },
    {
        field: "status",
        headerName: "Status",
        description: "This column has a value getter and is not sortable.",
        // sortable: false,
        width: 160,
        // valueGetter: (params: GridValueGetterParams) =>
        //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
];

export default function TableTaskInWorkspace({ tasks }: { tasks?: ITaskOfWorkspace[] }) {
    const [rows, setRows] = useState<any[]>([]);
    //     const rows = [
    //         { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    //         { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    //         { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    //         { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    //         { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    //         { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    //         { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    //         { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    //         { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    //     ];
    //     let rows: any[] = [];
    //     let row: any[] = [];
    if (tasks?.length && rows.length === 0) {
        tasks?.map((task, id) => {
            task.userId?.map((userId, index) => {
                setRows((rows) => [
                    ...rows,
                    {
                        id: Math.random(),
                        firstName: task.firstName[index],
                        lastName: task.lastName[index],
                        task: task.name,
                        createdAt: task.createdAt,
                        status: task.status,
                    },
                ]);
            });
        });
    }

    return (
        <div style={{ height: 400, width: "100%" }}>
            {rows.length > 0 && (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                />
            )}
        </div>
    );
}
