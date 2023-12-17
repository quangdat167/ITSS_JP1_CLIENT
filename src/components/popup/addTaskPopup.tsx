import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Config from "utils/Config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { updateTaskApi, createTaskApi, deleteTaskApi } from "service/task.service";
import { IWorkspace } from "redux/reducer/workspace";
import { IProject, ITask } from "pages/Workspace/detail";
import FindUserInput from "components/find-user";
import moment from "moment";
import Box from "@mui/material/Box";

export default function PopupAddTask({
    open,
    setOpen,
    type,
    workspace,
    project,
    memberProject,
    mode,
    setMode,
    taskInfo,
    projectName,
    workspaceName,
    role,
}: {
    open: boolean;
    setOpen: Function;
    type?: string;
    workspace?: IWorkspace;
    project?: IProject;
    memberProject?: any;
    mode: string;
    setMode: Function;
    taskInfo?: ITask;
    projectName?: string;
    workspaceName?: string;
    role: number;
}) {
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [startTime, setStartTime] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState(Config.PRIORITY_NORMAL);
    const [member, setMember] = useState<any>([]);

    const [status, setStatus] = useState("");

    console.log("role: ", role);

    const handleClose = () => {
        setOpen(false);
    };
    console.log("taskInfo: ", taskInfo);

    const isValidField = () => {
        if (name.length > 0 && startTime.length > 0 && deadline.length > 0 && priority.length) {
            return true;
        } else {
            alert("Please fill in all information");
            return false;
        }
    };

    const isValidTime = () => {
        if (startTime.length > 0 && deadline.length > 0) {
            const deadlineDate = new Date(deadline);
            const startTimeDate = new Date(startTime);

            if (deadlineDate >= startTimeDate) {
                return true;
            } else {
                alert("End time must be on the same day and after Start time");
                return false;
            }
        } else {
            alert("Please fill in all information");
            return false;
        }
    };

    const handleAddTask = async () => {
        if (type) {
            const params = {
                userId: userInfo._id,
                name,
                description: des,
                startTime: new Date(startTime),
                deadline: new Date(deadline),
                priority,
                workspaceId: workspace?._id ? workspace?._id : undefined,
                type,
                projectId: project?._id ? project?._id : undefined,
                memberId: member.length
                    ? member.filter((e: any) => e._id !== userInfo._id).map((e: any) => e._id)
                    : undefined,
            };

            await createTaskApi(params);

            window.location.reload();
        }
    };

    const handleChangeStatus = async (e: any) => {
        setStatus(e.target.value);
        if (taskInfo) {
            await updateTaskApi({ taskId: taskInfo?._id, status: e.target.value });
            window.location.reload();
        }
    };

    useEffect(() => {
        if (taskInfo?.status) {
            setStatus(taskInfo.status);
        }
    }, [taskInfo]);

    const handleDeleteTask = async () => {
        const shouldDelete = window.confirm("Delete task?");
        if (shouldDelete && taskInfo) {
            await deleteTaskApi({ taskId: taskInfo._id });
            handleClose();
            window.location.reload();
        }
    };
    const handleEditTask = () => {
        setMode(Config.MODE_EDIT);
        if (taskInfo) {
            setName(taskInfo.name);
            setDes(taskInfo.description);
            setStartTime(moment(taskInfo.startTime).format("YYYY-MM-DD"));
            setDeadline(moment(taskInfo.deadline).format("YYYY-MM-DD"));
            setPriority(taskInfo.priority);
        }
    };
    const handleSaveTask = async () => {
        if (taskInfo && isValidField() && isValidTime()) {
            const params = {
                taskId: taskInfo._id,
                name,
                description: des,
                startTime: new Date(startTime),
                deadline: new Date(deadline),
                priority,
            };

            await updateTaskApi(params);
            window.location.reload();
        }
    };

    return (
        <>
            <Dialog
                className="dialog-add-task-wrapper"
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
            >
                <div className="d-flex justify-content-between">
                    {mode === Config.MODE_CREATE && <DialogTitle>CREATE NEW TASK</DialogTitle>}
                    {mode === Config.MODE_VIEW && <DialogTitle>TASK DETAIL</DialogTitle>}
                    {mode === Config.MODE_EDIT && <DialogTitle>EDIT TASK</DialogTitle>}

                    {role !== Config.USERTASK_ROLE_NONE && (
                        <Box sx={{ minWidth: 200, padding: "8px 24px 0 24px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    disabled={status === Config.TASK_PROGRESS.DONE}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Age"
                                    onChange={handleChangeStatus}
                                >
                                    <MenuItem value={Config.TASK_PROGRESS.TO_DO}>To do</MenuItem>
                                    <MenuItem value={Config.TASK_PROGRESS.PROCESSING}>
                                        Processing
                                    </MenuItem>
                                    <MenuItem value={Config.TASK_PROGRESS.REVIEW}>Review</MenuItem>
                                    <MenuItem value={Config.TASK_PROGRESS.DONE}>Done</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </div>
                <DialogContent className="content-wrapper">
                    <TextField
                        InputProps={
                            mode === Config.MODE_VIEW
                                ? {
                                      readOnly: true,
                                  }
                                : {}
                        }
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={mode === Config.MODE_VIEW ? taskInfo?.name : name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        InputProps={
                            mode === Config.MODE_VIEW
                                ? {
                                      readOnly: true,
                                  }
                                : {}
                        }
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={mode === Config.MODE_VIEW ? taskInfo?.description : des}
                        onChange={(e) => setDes(e.target.value)}
                    />

                    <div className="space-between">
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                            <InputLabel id="priority-lable">Priority</InputLabel>
                            <Select
                                inputProps={
                                    mode === Config.MODE_VIEW
                                        ? {
                                              readOnly: true,
                                          }
                                        : {}
                                }
                                labelId="priority-lable"
                                id="priority"
                                value={mode === Config.MODE_VIEW ? taskInfo?.priority : priority}
                                onChange={(e) => setPriority(e.target.value)}
                                label="Priority"
                            >
                                <MenuItem value={Config.PRIORITY_HIGHEST}>Highest</MenuItem>
                                <MenuItem value={Config.PRIORITY_HIGH}>High</MenuItem>
                                <MenuItem value={Config.PRIORITY_MEDIUM}>Medium</MenuItem>
                                <MenuItem value={Config.PRIORITY_NORMAL}>Normal</MenuItem>
                                <MenuItem value={Config.PRIORITY_LOW}>Low</MenuItem>
                                <MenuItem value={Config.PRIORITY_LOWEST}>Lowest</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                value={taskInfo?.type ?? type}
                                disabled
                                label="Type"
                            >
                                <MenuItem value={Config.TASK_TYPE_INDIVIDUAL}>Individual</MenuItem>
                                <MenuItem value={Config.TASK_TYPE_GROUP}>Group</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="space-between">
                        <div className="range-time">
                            <div className="lable">Start time:</div>
                            <TextField
                                InputProps={
                                    mode === Config.MODE_VIEW
                                        ? {
                                              readOnly: true,
                                          }
                                        : {}
                                }
                                autoFocus
                                margin="dense"
                                id="startTime"
                                type="date"
                                variant="standard"
                                value={
                                    mode === Config.MODE_VIEW
                                        ? moment(taskInfo?.startTime).format("YYYY-MM-DD")
                                        : startTime
                                }
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div className="range-time">
                            <div className="lable">Deadline:</div>
                            <TextField
                                InputProps={
                                    mode === Config.MODE_VIEW
                                        ? {
                                              readOnly: true,
                                          }
                                        : {}
                                }
                                autoFocus
                                margin="dense"
                                id="deadline"
                                type="date"
                                variant="standard"
                                value={
                                    mode === Config.MODE_VIEW
                                        ? moment(taskInfo?.deadline).format("YYYY-MM-DD")
                                        : deadline
                                }
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>
                    </div>

                    {(type === Config.TASK_TYPE_GROUP || mode === Config.MODE_VIEW) && (
                        <>
                            <TextField
                                InputProps={
                                    mode === Config.MODE_VIEW
                                        ? {
                                              readOnly: true,
                                          }
                                        : {}
                                }
                                autoFocus
                                margin="dense"
                                label="Workspace"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={
                                    mode === Config.MODE_VIEW
                                        ? workspaceName
                                            ? workspaceName
                                            : taskInfo?.workspaceName
                                            ? taskInfo?.workspaceName
                                            : "None"
                                        : workspace?.name
                                }
                                disabled={mode === Config.MODE_CREATE}
                            />

                            <TextField
                                InputProps={
                                    mode === Config.MODE_VIEW
                                        ? {
                                              readOnly: true,
                                          }
                                        : {}
                                }
                                autoFocus
                                margin="dense"
                                label="Project"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={
                                    mode === Config.MODE_VIEW
                                        ? projectName
                                            ? projectName
                                            : taskInfo?.projectName
                                            ? taskInfo?.projectName
                                            : "None"
                                        : project?.name
                                }
                                disabled={mode === Config.MODE_CREATE}
                            />

                            {memberProject && (
                                <div className="mt-3">
                                    <FindUserInput
                                        value={member}
                                        setValue={setMember}
                                        fixedUser={memberProject}
                                        disabledUsers={[
                                            memberProject?.find(
                                                (option: any) => option?.email === userInfo.email,
                                            ),
                                        ]}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <div className="w-100 d-flex justify-content-between">
                        <div>
                            {role === Config.USERTASK_ROLE_ADMIN && (
                                <Button
                                    onClick={handleDeleteTask}
                                    color="error"
                                    variant="contained"
                                >
                                    Delete
                                </Button>
                            )}
                        </div>
                        <div>
                            <Button onClick={handleClose}>Cancel</Button>
                            {mode === Config.MODE_CREATE && (
                                <Button onClick={handleAddTask} variant="contained">
                                    Create
                                </Button>
                            )}
                            {status !== Config.TASK_PROGRESS.DONE &&
                                role === Config.USERTASK_ROLE_ADMIN &&
                                mode === Config.MODE_VIEW && (
                                    <Button onClick={handleEditTask} variant="contained">
                                        Edit
                                    </Button>
                                )}
                            {role === Config.USERTASK_ROLE_ADMIN && mode === Config.MODE_EDIT && (
                                <Button onClick={handleSaveTask} variant="contained">
                                    Save
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}
