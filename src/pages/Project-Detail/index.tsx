import { IProject, ITask } from "pages/Workspace/detail";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import { getAllTaskOfProjectApi, getAllUserOfProjectApi } from "service/project.service";
import TableTask from "components/table-task";
import Config from "utils/Config";
import moment from "moment";
import { IUserInfo } from "redux/reducer/userinfo";

export interface IUserOfProject {
    _id: string;
    role: number;
    projectId: string;
    userId: string;
    userInfo: IUserInfo;
}

function ProjectDetail({
    currentProject,
    setOpenLayoutProject,
}: {
    currentProject: IProject;
    setOpenLayoutProject: Function;
}) {
    const [allTask, setAllTask] = useState([] as ITask[]);
    const [allUser, setAllUser] = useState([] as IUserOfProject[]);
    const [adminProject, setAdminProject] = useState([] as IUserOfProject[]);
    const [memberProject, setMemberProject] = useState([] as IUserOfProject[]);
    const [tasksNotDone, setTaskNotDone] = useState([] as ITask[]);
    const [tasksDone, setTaskDone] = useState([] as ITask[]);
    useEffect(() => {
        const getAllTask = async () => {
            const alltaskApi = await getAllTaskOfProjectApi({ _id: currentProject._id });

            if (alltaskApi.length) {
                setAllTask(alltaskApi);
            }
        };
        const getAllUser = async () => {
            const allUserApi = await getAllUserOfProjectApi({ _id: currentProject._id });
            if (allUserApi.length) {
                setAllUser(allUserApi);
            }
        };
        currentProject._id && getAllTask();
        currentProject._id && getAllUser();
    }, []);

    useEffect(() => {
        if (allTask.length) {
            setTaskDone(allTask.filter((t) => t.status === Config.TASK_PROGRESS.DONE));
            setTaskNotDone(allTask.filter((t) => t.status !== Config.TASK_PROGRESS.DONE));
        }
    }, [allTask]);

    useEffect(() => {
        if (allUser.length) {
            setAdminProject(allUser.filter((u) => u.role === Config.USERPROJECT_ROLE_ADMIN));
            setMemberProject(allUser.filter((u) => u.role !== Config.USERPROJECT_ROLE_ADMIN));
        }
    }, [allUser]);

    return (
        <>
            <div className="d-flex gap-4 align-items-center">
                <KeyboardBackspaceIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setOpenLayoutProject(false);
                    }}
                />
                <div className="fs-3 fw-medium">{currentProject.name}</div>
            </div>
            <div className="d-flex gap-2 mt-3">
                <div className="left-side" style={{ width: "70%" }}>
                    <div className="">
                        {tasksNotDone.length ? (
                            <>
                                <div className="mb-2 fs-5">In progress</div>
                                <TableTask
                                    tasks={allTask.filter(
                                        (t) => t.status !== Config.TASK_PROGRESS.DONE,
                                    )}
                                    projectName={currentProject.name}
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
                                    tasks={allTask.filter(
                                        (t) => t.status === Config.TASK_PROGRESS.DONE,
                                    )}
                                    projectName={currentProject.name}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="mb-2 fs-5">Don't have task done</div>
                            </>
                        )}
                    </div>
                </div>

                <div className="right-side border border-light-subtle p-2" style={{ width: "30%" }}>
                    <div className="fs-3 fw-medium">{currentProject.name}</div>
                    <div>Description: {currentProject.description}</div>
                    <div>
                        Deadline: {moment(currentProject.deadline).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    <div>
                        Admin:{" "}
                        <ul>
                            {adminProject.map((admin, index) => (
                                <li>
                                    {admin.userInfo.firstName} {admin.userInfo.lastName}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        Member:
                        <ul>
                            {memberProject.map((admin, index) => (
                                <li>
                                    {admin.userInfo.firstName} {admin.userInfo.lastName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetail;
