import Stack from "@mui/material/Stack";
import PopupJoinWorkspace from "components/popup/joinWorkspacePopup";
import TableTaskInHome from "components/table-task-in-home";
import moment from "moment";
import { IMyTask } from "pages/My-Task";
import { Workspace } from "pages/Workspace";
import { IProject, ITask, IUserProject } from "pages/Workspace/detail";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getAllProjectByUserApi } from "service/project.service";
import { getAllTaskByUserIdApi } from "service/task.service";
import { getWorkspaceByUserIdApi } from "service/workspace.service";
import LoginIcon from "@mui/icons-material/Login";
import Config from "utils/Config";

function getGreeting() {
    const currentHour = moment().hour();

    const MORNING_START = 5;
    const AFTERNOON_START = 12;
    const EVENING_START = 18;
    const NIGHT_START = 22;

    if (currentHour >= MORNING_START && currentHour < AFTERNOON_START) {
        return "Good morning";
    } else if (currentHour >= AFTERNOON_START && currentHour < EVENING_START) {
        return "Good afternoon";
    } else if (currentHour >= EVENING_START && currentHour < NIGHT_START) {
        return "Good evening";
    } else {
        return "Good night";
    }
}

export const HomePage = () => {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [allTask, setAllTask] = useState([] as IMyTask[]);
    const [allProjects, setAllProjects] = useState([] as IProject[]);
    const [tasksNotDone, setTaskNotDone] = useState([] as ITask[]);
    const [tasksDone, setTaskDone] = useState([] as IMyTask[]);
    const [taskOverDue, setTaskOverDue] = useState([] as IMyTask[]);
    const [allTaskInfo, setAllTaskInfo] = useState([] as ITask[]);
    const [listWs, setListWs] = useState([] as Workspace[]);
    const [openPopupJoinWorkspace, setOpenPopupJoinWorkspace] = useState(false);

    useEffect(() => {
        const getAllTask = async () => {
            let allTaskApi = await getAllTaskByUserIdApi({ userId: userInfo?._id });
            if (allTaskApi.length > 0) {
                setAllTask(allTaskApi);
            }
        };

        const getAllProject = async () => {
            let allPrj = await getAllProjectByUserApi({ userId: userInfo?._id });
            if (allPrj.length > 0) {
                setAllProjects(allPrj.map((prj: IUserProject) => prj.projectInfo));
            }
        };

        const getWs = async () => {
            let ws: Workspace[] = await getWorkspaceByUserIdApi({ userId: userInfo?._id });
            if (ws.length > 0) {
                // ws.forEach((item) => setListWs((ws) => [...ws, item.workspace]));
                setListWs(ws);
            }
        };

        userInfo?.email && getAllTask();
        userInfo?.email && getAllProject();
        userInfo?.email && getWs();
    }, [userInfo?.email]);

    useEffect(() => {
        if (allTask.length) {
            setAllTaskInfo(allTask.map((t) => t.taskInfo));
            setTaskDone(allTask.filter((t) => t.taskInfo.status === Config.TASK_PROGRESS.DONE));

            setTaskNotDone(
                allTask
                    .filter(
                        (t) =>
                            t.taskInfo.status !== Config.TASK_PROGRESS.DONE &&
                            new Date(t.taskInfo.deadline).getTime() > new Date().getTime(),
                    )
                    .sort((taskA, taskB) => {
                        const deadlineA = new Date(taskA.taskInfo.deadline).getTime();
                        const deadlineB = new Date(taskB.taskInfo.deadline).getTime();

                        // Sắp xếp giảm dần theo deadline
                        return deadlineA - deadlineB;
                    })
                    .map((t) => t.taskInfo),
            );

            setTaskOverDue(
                allTask.filter(
                    (t) =>
                        t.taskInfo.status !== Config.TASK_PROGRESS.DONE &&
                        new Date(t.taskInfo.deadline).getTime() <= new Date().getTime(),
                ),
            );
        }
    }, [allTask]);

    return (
        <>
            <div className="p-3 detail-workspace-wrapper">
                <div className="d-flex justify-content-between">
                    <div className="fs-3 fw-medium">Home</div>
                </div>

                <div className="mt-3 text-center ">
                    <div className="fs-4 fw-medium">
                        {moment(new Date()).format("dddd, MMMM D")}
                    </div>
                    <div className="fs-5 ">
                        {getGreeting() + ", " + userInfo.firstName + " " + userInfo.lastName}
                    </div>
                </div>

                <div className="mt-3 d-flex justify-content-between">
                    <div style={{ width: "48%" }}>
                        <div className="mb-3">My day</div>
                        <TableTaskInHome tasks={tasksNotDone} />
                    </div>

                    <div style={{ width: "48%" }}>
                        <div className="mb-3">Project</div>
                        <Stack
                            spacing={2}
                            direction="row"
                            useFlexGap
                            flexWrap="wrap"
                            justifyContent="space-between"
                            className="p-3 border h-100 "
                            style={{ maxHeight: 300, overflowY: "scroll" }}
                        >
                            {allProjects.map((project, index) => {
                                return (
                                    <div style={{ width: "45%" }}>
                                        <div>Name: {project.name}</div>
                                        <div>Workspace: {project.workspaceName}</div>
                                    </div>
                                );
                            })}
                        </Stack>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="mb-3">Workspace</div>
                    <Stack
                        spacing={2}
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                        justifyContent="space-between"
                        className="p-3 border h-100 "
                        style={{ maxHeight: 300, overflowY: "scroll" }}
                    >
                        <div
                            onClick={() => {
                                setOpenPopupJoinWorkspace(true);
                            }}
                            className="d-flex gap-2 text-body-secondary align-items-center "
                            style={{ cursor: "pointer" }}
                        >
                            <LoginIcon />
                            Join new workspace
                        </div>
                        {listWs.map((ws, index) => {
                            return (
                                <div style={{ width: "45%" }}>
                                    <div>Name: {ws.workspace.name}</div>
                                </div>
                            );
                        })}
                    </Stack>
                </div>
            </div>
            <PopupJoinWorkspace open={openPopupJoinWorkspace} setOpen={setOpenPopupJoinWorkspace} />
        </>
    );
};
