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
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { createTaskApi } from "service/task.service";

export default function PopupAddTask({ open, setOpen }: { open: boolean; setOpen: Function }) {
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [startTime, setStartTime] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState(Config.PRIORITY_NORMAL);
    const [workspaceId, setWorkspaceId] = useState("");
    const [type, setType] = useState(Config.TASK_TYPE_INDIVIDUAL);
    const [projectId, setProjectId] = useState("");
    const [memberId, setMemberId] = useState([]);
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddEvent = async () => {
        const params = {
            userId: userInfo._id,
            name,
            description: des,
            startTime: new Date(startTime),
            deadline: new Date(deadline),
            priority,
            workspaceId: workspaceId.length > 20 ? workspaceId : undefined,
            type,
            projectId: projectId.length > 20 ? projectId : undefined,
            memberId,
        };

        const newTask = await createTaskApi(params);

        console.log("params: ", newTask);
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
                <DialogTitle>CREATE NEW TASK</DialogTitle>

                <DialogContent className="content-wrapper">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />

                    <div className="space-between">
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                            <InputLabel id="priority-lable">Priority</InputLabel>
                            <Select
                                labelId="priority-lable"
                                id="priority"
                                value={priority}
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
                                value={type}
                                onChange={(e) => setType(e.target.value)}
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
                                autoFocus
                                margin="dense"
                                id="startTime"
                                type="date"
                                variant="standard"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div className="range-time">
                            <div className="lable">Deadline:</div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="deadline"
                                type="date"
                                variant="standard"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>
                    </div>

                    <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 220 }}>
                        <InputLabel id="workspace-label">Workspace</InputLabel>
                        <Select
                            labelId="workspace-label"
                            id="workspace"
                            value={workspaceId}
                            onChange={(e) => setWorkspaceId(e.target.value)}
                            label="Workspace"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            <MenuItem value={Config.TASK_TYPE_INDIVIDUAL}>Individual</MenuItem>
                            <MenuItem value={Config.TASK_TYPE_GROUP}>Group</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 220 }}>
                        <InputLabel id="project-label">Project</InputLabel>
                        <Select
                            labelId="project-label"
                            id="project"
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            label="Project"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={Config.TASK_TYPE_INDIVIDUAL}>Individual</MenuItem>
                            <MenuItem value={Config.TASK_TYPE_GROUP}>Group</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="member-search" label="Guest" type="search" variant="standard" />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddEvent} variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
