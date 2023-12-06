import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ITask, ITaskOfWorkspace } from "pages/Workspace/detail";
import { useEffect, useState } from "react";
import moment from "moment";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Task", width: 200 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "projectName", headerName: "Project", width: 200 },
    {
        field: "status",
        headerName: "Status",
        width: 160,
    },
];

export default function TableTask({
    tasks,
    projectName,
}: {
    tasks?: ITask[];
    projectName?: string;
}) {
    const [rows, setRows] = useState<any[]>([]);
    if (tasks?.length && rows.length === 0) {
        tasks?.map((task, id) => {
            setRows((rows) => [
                ...rows,
                {
                    id: id + 1,
                    name: task.name,
                    projectName: projectName,
                    deadline: moment(task.deadline).format("YYYY-MM-DD HH:mm:ss"),
                    status: task.status,
                },
            ]);
        });
    }

    return (
        <div style={{ height: 300, width: "100%" }}>
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
