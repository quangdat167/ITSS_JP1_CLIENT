import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ITask, ITaskOfWorkspace } from "pages/Workspace/detail";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
    //     { field: "id", headerName: "ID", width: 70 },
    //     { field: "firstName", headerName: "First name", width: 100 },
    //     { field: "lastName", headerName: "Last name", width: 100 },
    {
        field: "name",
        headerName: "Name",
        width: 120,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "task", headerName: "Task", width: 400 },
    { field: "projectName", headerName: "Project", width: 300 },
    {
        field: "createdAt",
        headerName: "Created at",
        // type: "date",
        width: 300,
    },
    {
        field: "status",
        headerName: "Status",
        // description: "This column has a value getter and is not sortable.",
        // sortable: false,
        width: 160,
    },
];

export default function TableTaskInWorkspace({ tasks }: { tasks?: ITaskOfWorkspace[] }) {
    const [rows, setRows] = useState<any[]>([]);
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
                        projectName: task.projectName[0],
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
                    rowSelection={false}
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
