import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IEvent, addEvent, deleteEvent, editOneEvent } from "redux/reducer/event";
import { RootState } from "redux/store";
import {
    createEventApi,
    deleteEventByUserIdApi,
    editEventByUserIdApi,
} from "service/event.service";
import Config from "utils/Config";
import "./styles.scss";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getWorkspaceByUserIdApi } from "service/workspace.service";
import { Workspace } from "pages/Workspace";
import { IWorkspace } from "redux/reducer/workspace";
export default function PopupAddEvent({
    open,
    setOpen,
    mode = Config.MODE_CREATE,
    setMode,
    selectedEvent,
    selectedDay,
}: {
    open: boolean;
    setOpen: Function;
    mode: string;
    setMode: Function;
    selectedEvent?: IEvent;
    selectedDay?: Date;
}) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [wsId, setWsId] = useState("");
    const [listWs, setListWs] = useState([] as IWorkspace[]);

    const handleClose = () => {
        setName("");
        setDes("");
        setStartTime("");
        setEndTime("");
        setWsId("");
        setOpen(false);
    };

    useEffect(() => {
        setStartTime(moment(selectedDay).format("YYYY-MM-DDTHH:mm"));
        setEndTime(moment(selectedDay).format("YYYY-MM-DDTHH:mm"));
    }, [selectedDay]);

    useEffect(() => {
        const getWs = async () => {
            let ws: Workspace[] = await getWorkspaceByUserIdApi({ userId: userInfo?._id });
            if (ws.length > 0) {
                setListWs(ws.map((w) => w.workspace));
            }
        };
        userInfo?.email && getWs();
    }, [userInfo?.email]);

    const isValidField = () => {
        if (name.length > 0 && startTime.length > 0 && endTime.length > 0) {
            return true;
        } else {
            alert("Please fill in all information");
            return false;
        }
    };

    const isValidTime = () => {
        if (startTime.length > 0 && endTime.length > 0) {
            const deadlineDate = new Date(endTime);
            const startTimeDate = new Date(startTime);

            if (
                deadlineDate.toDateString() === startTimeDate.toDateString() &&
                deadlineDate >= startTimeDate
            ) {
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

    const handleDeadlineChange = (e: any) => {
        const newDeadline = e.target.value;
        setEndTime(newDeadline);
    };

    const handleAddEvent = async () => {
        if (isValidField() && isValidTime()) {
            const params = {
                userId: userInfo._id,
                name,
                description: des,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                wsId: wsId ? wsId : undefined,
            };

            const newEvent = await createEventApi(params);

            if (newEvent) {
                dispatch(addEvent([newEvent]));
                handleClose();
            }
        }
    };

    const handleEditEvent = () => {
        setMode(Config.MODE_EDIT);
        if (selectedEvent) {
            setName(selectedEvent.name);
            selectedEvent.description && setDes(selectedEvent.description);
            setStartTime(moment(selectedEvent?.startTime).format("YYYY-MM-DDTHH:mm"));
            setEndTime(moment(selectedEvent?.endTime).format("YYYY-MM-DDTHH:mm"));
            const idWs = listWs.find((ws) => ws._id === selectedEvent?.wsId)?._id;
            if (idWs) {
                setWsId(idWs);
            }
        }
    };

    const handleSaveEvent = async () => {
        if (selectedEvent && isValidField() && isValidTime()) {
            const params = {
                _id: selectedEvent?._id,
                name,
                description: des,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                wsId: wsId ? wsId : undefined,
            };
            if (wsId !== selectedEvent.wsId) {
                window.location.reload();
            }
            await editEventByUserIdApi(params);
            dispatch(editOneEvent(params));
            handleClose();
        }
    };

    const handleDeleteEvent = async () => {
        const shouldDelete = window.confirm("Delete event?");

        if (shouldDelete && selectedEvent) {
            await deleteEventByUserIdApi({ _id: selectedEvent?._id });
            dispatch(deleteEvent(selectedEvent?._id));
            handleClose();
        }
    };

    return (
        <>
            <Dialog
                className="dialog-add-event-wrapper"
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
            >
                {mode === Config.MODE_CREATE && <DialogTitle>CREATE NEW EVENT</DialogTitle>}
                {mode === Config.MODE_VIEW && <DialogTitle>EVENT DETAIL</DialogTitle>}
                {mode === Config.MODE_EDIT && <DialogTitle>EDIT EVENT</DialogTitle>}

                <DialogContent className="content-wrapper">
                    <TextField
                        // disabled={mode === Config.MODE_VIEW}
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
                        value={mode === Config.MODE_VIEW ? selectedEvent?.name : name}
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
                        value={mode === Config.MODE_VIEW ? selectedEvent?.description : des}
                        onChange={(e) => setDes(e.target.value)}
                    />

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
                                type="datetime-local"
                                variant="standard"
                                value={
                                    mode === Config.MODE_VIEW
                                        ? moment(selectedEvent?.startTime).format(
                                              "YYYY-MM-DDTHH:mm",
                                          )
                                        : startTime
                                }
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div className="range-time">
                            <div className="lable">End time: </div>
                            <TextField
                                InputProps={
                                    mode === Config.MODE_VIEW
                                        ? {
                                              readOnly: true,
                                          }
                                        : {}
                                }
                                disabled={mode !== Config.MODE_VIEW && startTime.length === 0}
                                margin="dense"
                                id="startTime"
                                type="datetime-local"
                                variant="standard"
                                value={
                                    mode === Config.MODE_VIEW
                                        ? moment(selectedEvent?.endTime).format("YYYY-MM-DDTHH:mm")
                                        : endTime
                                }
                                onChange={handleDeadlineChange}
                            />
                        </div>
                    </div>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Workspace</InputLabel>
                        <Select
                            inputProps={
                                mode === Config.MODE_VIEW
                                    ? {
                                          readOnly: true,
                                      }
                                    : {}
                            }
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={
                                mode === Config.MODE_VIEW
                                    ? listWs.find((ws) => ws._id === selectedEvent?.wsId)?._id
                                    : wsId
                            }
                            onChange={(e) => setWsId(e.target.value)}
                            label="Workspace"
                        >
                            {mode !== Config.MODE_EDIT && (
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                            )}
                            {listWs.map((ws, id) => (
                                <MenuItem key={id} value={ws._id}>
                                    {ws.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    {mode === Config.MODE_VIEW && (
                        <Button onClick={handleDeleteEvent} color="error" variant="contained">
                            Delete
                        </Button>
                    )}
                    <Button onClick={handleClose}>Cancel</Button>
                    {mode === Config.MODE_CREATE && (
                        <Button onClick={handleAddEvent} variant="contained">
                            Create
                        </Button>
                    )}
                    {mode === Config.MODE_VIEW && (
                        <Button onClick={handleEditEvent} variant="contained">
                            Edit
                        </Button>
                    )}
                    {mode === Config.MODE_EDIT && (
                        <Button onClick={handleSaveEvent} variant="contained">
                            Save
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
