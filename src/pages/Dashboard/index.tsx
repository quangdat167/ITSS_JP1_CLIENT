import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GradingIcon from "@mui/icons-material/Grading";
import TaskIcon from "@mui/icons-material/Task";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useEffect, useState } from "react";
import { getAllTaskByUserIdApi } from "service/task.service";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { IMyTask } from "pages/My-Task";
import Config from "utils/Config";
import { PieChart } from "react-minimal-pie-chart";
import { IProject, ITask, IUserProject, LinearProgressWithLabel } from "pages/Workspace/detail";
import { getAllProjectByUserApi } from "service/project.service";
import moment from "moment";
export const DashboardPage = () => {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [allTask, setAllTask] = useState([] as IMyTask[]);
    const [allProjects, setAllProjects] = useState([] as IProject[]);
    const [tasksNotDone, setTaskNotDone] = useState([] as IMyTask[]);
    const [tasksDone, setTaskDone] = useState([] as IMyTask[]);
    const [taskOverDue, setTaskOverDue] = useState([] as IMyTask[]);
    const [allTaskInfo, setAllTaskInfo] = useState([] as ITask[]);

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

        userInfo?.email && getAllTask();
        userInfo?.email && getAllProject();
    }, [userInfo?.email]);

    useEffect(() => {
        if (allTask.length) {
            setAllTaskInfo(allTask.map((t) => t.taskInfo));
            setTaskDone(allTask.filter((t) => t.taskInfo.status === Config.TASK_PROGRESS.DONE));

            setTaskNotDone(
                allTask.filter(
                    (t) =>
                        t.taskInfo.status !== Config.TASK_PROGRESS.DONE &&
                        new Date(t.taskInfo.deadline).getTime() > new Date().getTime(),
                ),
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

    const data = [
        {
            title: "Done",
            value: Math.floor((tasksDone.length / allTask.length) * 100),
            color: "green",
            key: "dfsd",
        },
        {
            title: "Inprogress",
            value: Math.floor((tasksNotDone.length / allTask.length) * 100),
            color: "blue",
        },
        {
            title: "Overdue",
            value: Math.floor((taskOverDue.length / allTask.length) * 100),
            color: "red",
        },
    ];

    return (
        <>
            <div className="p-3 detail-workspace-wrapper">
                <div className="d-flex justify-content-between">
                    <div className="fs-3 fw-medium">Dashboard</div>
                </div>

                <div className="mt-3">
                    <div className="fs-6 mb-3">Overview</div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3" style={{ height: "fit-content" }}>
                            <Card sx={{ width: 120 }} variant="outlined">
                                <CardContent>
                                    <Typography gutterBottom>
                                        <GradingIcon fontSize="large" />
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>Total</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {allTask.length} Tasks
                                    </Typography>
                                </CardContent>
                                {allTask.length ? (
                                    <CardActions>
                                        <Button size="small" color="success">
                                            +50%
                                        </Button>
                                    </CardActions>
                                ) : (
                                    <></>
                                )}
                            </Card>

                            <Card sx={{ width: 120 }} variant="outlined">
                                <CardContent>
                                    <Typography gutterBottom>
                                        <TaskIcon fontSize="large" />
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>Completed</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {tasksDone.length} Tasks
                                    </Typography>
                                </CardContent>
                                {tasksDone.length ? (
                                    <CardActions>
                                        <Button size="small" color="success">
                                            +30%
                                        </Button>
                                    </CardActions>
                                ) : (
                                    <></>
                                )}
                            </Card>

                            <Card sx={{ width: 120 }} variant="outlined">
                                <CardContent>
                                    <Typography gutterBottom>
                                        <AccessAlarmIcon fontSize="large" />
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>Inprogress</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {tasksNotDone.length} Tasks
                                    </Typography>
                                </CardContent>
                                {tasksNotDone.length ? (
                                    <CardActions>
                                        <Button size="small" color="success">
                                            +60%
                                        </Button>
                                    </CardActions>
                                ) : (
                                    <></>
                                )}
                            </Card>

                            <Card sx={{ width: 120 }} variant="outlined">
                                <CardContent>
                                    <Typography gutterBottom>
                                        <EventBusyIcon fontSize="large" />
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>Overdue</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {taskOverDue.length} Tasks
                                    </Typography>
                                </CardContent>
                                {taskOverDue.length ? (
                                    <CardActions>
                                        <Button size="small" color="error">
                                            -20%
                                        </Button>
                                    </CardActions>
                                ) : (
                                    <></>
                                )}
                            </Card>
                        </div>
                        <div className="d-flex gap-5 align-items-center">
                            <PieChart data={data} style={{ width: 250 }} />
                            {allTask.length ? (
                                <div>
                                    <div className="mb-2 d-flex gap-2 align-items-center">
                                        <div
                                            style={{
                                                width: 30,
                                                height: 20,
                                                backgroundColor: "green",
                                            }}
                                        ></div>
                                        <div>Completed</div>
                                    </div>
                                    <div className="mb-2 d-flex gap-2 align-items-center">
                                        <div
                                            style={{
                                                width: 30,
                                                height: 20,
                                                backgroundColor: "blue",
                                            }}
                                        ></div>
                                        <div>Inprogress</div>
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <div
                                            style={{
                                                width: 30,
                                                height: 20,
                                                backgroundColor: "red",
                                            }}
                                        ></div>
                                        <div>Overdue</div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>

                {allProjects.length ? (
                    <div className="my-5 ">
                        <div className="fs-6 mb-3">Projects</div>
                        <div className="p-3 d-flex gap-3 overflow-x-scroll">
                            {allProjects.map((project, index) => {
                                const currentDate = moment();
                                const deadlineDate = moment(project.deadline);
                                const daysLeft = deadlineDate.diff(currentDate, "days");

                                let listTaskId: any = [];
                                let taskOfProject: any = [];
                                let taskDoneOfProject: any = [];
                                allTaskInfo.forEach((task) => {
                                    if (listTaskId.includes(task._id)) {
                                    } else {
                                        listTaskId.push(task._id);
                                        if (task.projectId === project._id) {
                                            taskOfProject.push(task);
                                            if (task.status === Config.TASK_PROGRESS.DONE) {
                                                taskDoneOfProject.push(task);
                                            }
                                        }
                                    }
                                });

                                const percentTaskDone =
                                    (taskDoneOfProject.length / taskOfProject.length) * 100;

                                return (
                                    <Card sx={{ minWidth: 200 }} variant="outlined">
                                        <CardContent>
                                            <Typography
                                                sx={{ fontSize: 16, fontWeight: 600 }}
                                                gutterBottom
                                            >
                                                {project.name}
                                            </Typography>

                                            <Typography
                                                sx={{ fontSize: 16, fontWeight: 500 }}
                                                gutterBottom
                                            >
                                                Workspace: {project.workspaceName}
                                            </Typography>

                                            <div className="mt-2 position-relative">
                                                <div style={{ marginBottom: -6 }}>
                                                    {taskOfProject.length > 0
                                                        ? `${taskOfProject.length} Task`
                                                        : "no task"}
                                                </div>
                                                <Box sx={{ width: "100%" }}>
                                                    <LinearProgressWithLabel
                                                        color="error"
                                                        value={
                                                            percentTaskDone > 0
                                                                ? percentTaskDone
                                                                : 0
                                                        }
                                                    />
                                                </Box>
                                            </div>

                                            <Typography
                                                className="mt-3"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {daysLeft > 0 ? `${daysLeft} day lefts` : "Overdue"}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
