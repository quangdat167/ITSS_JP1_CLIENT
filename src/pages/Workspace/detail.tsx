import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Workspace } from ".";
import {
    getAllUserOfWorkspaceApi,
    getDetailWorkspaceByIdApi,
    getWorkspaceByUserIdApi,
} from "service/workspace.service";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useParams } from "react-router-dom";
import { IUserInfo } from "redux/reducer/userinfo";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import "./styles.scss";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import moment from "moment";
import TableTaskInWorkspace from "components/table-task-in-workspace";
import PopupAddProject from "components/popup/addProjectPopup";
import PopupAddUserToWorkspace from "components/popup/addUserToWorkspacePopup";
import TableUserInWorkspace from "components/table-user-in-workspace";
export interface IUserWorkspace {
    _id: string;
    role: number;
    userId: string;
    wsId: string;
}

export interface IProject {
    _id: string;
    name: string;
    description?: string;
    userId: string;
    deadline: Date;
    wsId: string;
}

export interface ITask {
    _id: string;
    name: string;
    description: string;
    startTime: Date;
    deadline: Date;
    priority: string;
    status: string;
    workspaceId?: string;
    type: string;
    projectId?: string;
    // firstName?: string[];
    // lastName?: string[];
    // role?: number[];
    // userId?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITaskOfWorkspace extends ITask {
    firstName: string[];
    lastName: string[];
    role: number[];
    userId: string[];
    projectName: string[];
}

export interface DetailWorkspace {
    _id: string;
    name: string;
    description?: string;
    code: string;
    member: IUserInfo[];
    members: IUserWorkspace[];
    project?: IProject[];
    tasks: ITaskOfWorkspace[];
    createdAt?: Date;
    updatedAt?: Date;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export const WorkspaceDetailPage = () => {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [workspace, setWorkspace] = useState({} as DetailWorkspace);
    const { id } = useParams();
    const [openPopupAddProject, setOpenPopupAddProject] = useState(false);
    const [openPopupAddUser, setOpenPopupAddUser] = useState(false);
    const [openPopupViewUser, setOpenPopupViewUser] = useState(false);
    const [userOfWs, setUserOfWs] = useState<any>([]);

    useEffect(() => {
        const getWs = async () => {
            let ws: DetailWorkspace[] = await getDetailWorkspaceByIdApi({ _id: id! });
            if (ws.length > 0) {
                setWorkspace(ws[0]);
            }
        };

        userInfo?.email && id && getWs();
    }, [userInfo?.email]);

    useEffect(() => {
        const getAllUserOfWs = async () => {
            let allUser = await getAllUserOfWorkspaceApi({ wsId: workspace._id });
            if (allUser.length) {
                setUserOfWs(allUser.map((user: any) => user.userInfos));
            }
        };

        workspace._id && getAllUserOfWs();
    }, [workspace._id]);

    return (
        <div className="p-3 detail-workspace-wrapper">
            <div className="d-flex justify-content-between">
                <div className="fs-3 fw-medium">My Workspace</div>
            </div>

            <div className="my-3 d-flex justify-content-between">
                <AvatarGroup total={workspace.members?.length + 1}>
                    {workspace.member?.map((mem, index) => (
                        <Avatar
                            alt={mem.lastName + " " + mem.firstName}
                            src="/"
                            onClick={() => setOpenPopupViewUser(true)}
                        />
                    ))}
                    <Avatar
                        sx={{ bgcolor: "var(--primary)", cursor: "pointer" }}
                        onClick={() => setOpenPopupAddUser(true)}
                    >
                        <AddIcon />
                    </Avatar>
                </AvatarGroup>
                <div>
                    Code: <b>{workspace.code}</b>
                </div>
            </div>

            <div className="my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="fs-5 mb-3">Current projects</div>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenPopupAddProject(true);
                            // setMode(Config.MODE_CREATE_EVENT);
                        }}
                    >
                        Create new project
                    </Button>
                </div>
            </div>

            <div className="p-3 mb-3 d-flex gap-3 overflow-x-scroll">
                {workspace.project?.map((project, index) => {
                    const currentDate = moment();
                    const deadlineDate = moment(project.deadline);
                    const daysLeft = deadlineDate.diff(currentDate, "days");
                    return (
                        <Card sx={{ minWidth: 200 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 16, fontWeight: 500 }} gutterBottom>
                                    {project.name}
                                </Typography>

                                <div className="mt-2 position-relative">
                                    <div style={{ marginBottom: -6 }}>10 tasks</div>
                                    <Box sx={{ width: "100%" }}>
                                        <LinearProgressWithLabel color="error" value={50} />
                                    </Box>
                                </div>

                                <Typography className="mt-3" variant="body2" color="text.secondary">
                                    {daysLeft} day lefts
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="my-3 p-2">
                <TableTaskInWorkspace tasks={workspace?.tasks} />
            </div>
            <PopupAddProject
                open={openPopupAddProject}
                setOpen={setOpenPopupAddProject}
                wsId={workspace._id}
                userOfWs={userOfWs}
            />
            <PopupAddUserToWorkspace
                open={openPopupAddUser}
                setOpen={setOpenPopupAddUser}
                wsId={workspace._id}
                userOfWs={userOfWs}
            />
            <TableUserInWorkspace
                userInfos={workspace.member}
                open={openPopupViewUser}
                setOpen={setOpenPopupViewUser}
            />
        </div>
    );
};