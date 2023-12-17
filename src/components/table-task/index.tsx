import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ITask, ITaskOfWorkspace } from "pages/Workspace/detail";
import { useEffect, useState } from "react";
import moment from "moment";
import PopupAddTask from "components/popup/addTaskPopup";
import Config from "utils/Config";
import { truncate } from "fs/promises";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Task", width: 200 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "projectName", headerName: "Project", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    {
        field: "status",
        headerName: "Status",
        width: 160,
    },
];

export default function TableTask({
    tasks,
    projectName,
    workspaceName,
    height = 300,
    roles,
}: {
    tasks?: ITask[];
    projectName?: string;
    workspaceName?: string;
    height?: number;
    roles?: number[];
}) {
    const [openPoppupAddTask, setOpenPoppupAddTask] = useState(false);
    const [taskInfo, setTaskInfo] = useState({} as ITask);
    const [rows, setRows] = useState<any[]>([]);
    const [role, setRole] = useState(Config.USERTASK_ROLE_NONE);
    const [mode, setMode] = useState("");

    if (tasks?.length && rows.length === 0) {
        tasks?.map((task, id) => {
            setRows((rows) => [
                ...rows,
                {
                    id: id + 1,
                    name: task.name,
                    projectName: projectName ?? task.projectName,
                    deadline: moment(task.deadline).format("YYYY-MM-DD HH:mm:ss"),
                    type: task.type,
                    status: task.status,
                    taskInfo: task,
                },
            ]);
        });
    }

    return (
        <>
            <div style={{ height: height, width: "100%" }}>
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
                        pageSizeOptions={[5, 10, 15]}
                        onCellClick={(e) => {
                            setOpenPoppupAddTask(true);
                            setMode(Config.MODE_VIEW);
                            setTaskInfo(e.row.taskInfo);
                            if (roles?.length) {
                                setRole(roles[e.row.id - 1]);
                            } else if (e.row.taskInfo?.usertask) {
                                setRole(e.row.taskInfo.usertask.role);
                            }
                        }}
                        // checkboxSelection
                    />
                )}
            </div>

            <PopupAddTask
                open={openPoppupAddTask}
                setOpen={setOpenPoppupAddTask}
                // type={Config.TASK_TYPE_INDIVIDUAL}
                mode={mode}
                setMode={setMode}
                taskInfo={taskInfo}
                projectName={projectName}
                workspaceName={workspaceName}
                role={role}
            />
        </>
    );
}
