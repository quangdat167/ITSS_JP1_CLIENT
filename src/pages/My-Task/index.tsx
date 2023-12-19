import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getAllTaskByUserIdApi } from "service/task.service";
import "./styles.scss";
import TableTask from "components/table-task";
import { IProject, ITask } from "pages/Workspace/detail";
import Config from "utils/Config";
import PopupAddTask from "components/popup/addTaskPopup";
import { IWorkspace } from "redux/reducer/workspace";

export interface IMyTask {
    _id: string;
    role: number;
    taskId: string;
    userId: string;
    taskInfo: ITask;
    projectInfo: IProject;
    workspaceInfo: IWorkspace;
}

export const MyTaskPage = () => {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [mode, setMode] = useState("");

    const [allTask, setAllTask] = useState([] as IMyTask[]);
    const [tasksNotDone, setTaskNotDone] = useState([] as IMyTask[]);
    const [tasksDone, setTaskDone] = useState([] as IMyTask[]);
    const [openPoppupAddTask, setOpenPoppupAddTask] = useState(false);
    useEffect(() => {
        const getAllTask = async () => {
            let allTaskApi = await getAllTaskByUserIdApi({ userId: userInfo?._id });
            if (allTaskApi.length > 0) {
                setAllTask(allTaskApi);
            }
        };

        userInfo?.email && getAllTask();
    }, [userInfo?.email]);

    useEffect(() => {
        if (allTask.length) {
            setTaskDone(allTask.filter((t) => t.taskInfo.status === Config.TASK_PROGRESS.DONE));
            setTaskNotDone(allTask.filter((t) => t.taskInfo.status !== Config.TASK_PROGRESS.DONE));
        }
    }, [allTask]);

    return (
        <>
            <div className="p-3 detail-workspace-wrapper">
                <div className="d-flex justify-content-between  align-items-center">
                    <div className="fs-3 fw-medium">My Task</div>
                    <Button
                        size="small"
                        variant="outlined"
                        color="info"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenPoppupAddTask(true);
                            setMode(Config.MODE_CREATE);
                        }}
                    >
                        Create new task
                    </Button>
                </div>

                <div className="mt-3">
                    {tasksNotDone.length ? (
                        <>
                            <div className="mb-2 fs-5">In progress</div>
                            <TableTask
                                tasks={allTask
                                    .filter((t) => t.taskInfo.status !== Config.TASK_PROGRESS.DONE)
                                    .map((task) => task.taskInfo)}
                                height={350}
                                roles={allTask
                                    .filter((t) => t.taskInfo.status !== Config.TASK_PROGRESS.DONE)
                                    .map((task) => task.role)}
                            />
                        </>
                    ) : (
                        <>
                            <div className="mb-2 fs-5">Don't have task in progress</div>
                        </>
                    )}
                </div>
                <div className="mt-3">
                    {tasksDone.length ? (
                        <div>
                            <div className="mb-2 fs-5">Done</div>
                            <TableTask
                                tasks={allTask
                                    .filter((t) => t.taskInfo.status === Config.TASK_PROGRESS.DONE)
                                    .map((task) => task.taskInfo)}
                                height={350}
                                roles={allTask
                                    .filter((t) => t.taskInfo.status === Config.TASK_PROGRESS.DONE)
                                    .map((task) => task.role)}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="mb-2 fs-5">Don't have task done</div>
                        </>
                    )}
                </div>
            </div>
            <PopupAddTask
                open={openPoppupAddTask}
                setOpen={setOpenPoppupAddTask}
                type={Config.TASK_TYPE_INDIVIDUAL}
                mode={mode}
                setMode={setMode}
                role={Config.USERTASK_ROLE_NONE}
            />
        </>
    );
};
