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

    const handleClose = () => {
        setName("");
        setDes("");
        setStartTime("");
        setEndTime("");
        setOpen(false);
    };

    useEffect(() => {
        setStartTime(moment(selectedDay).format("YYYY-MM-DDTHH:mm"));
        setEndTime(moment(selectedDay).format("YYYY-MM-DDTHH:mm"));
    }, [selectedDay]);

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

        // if (startTime.length > 0) {
        //     const deadlineDate = new Date(newDeadline);
        //     const startTimeDate = new Date(startTime);

        //     if (
        //         deadlineDate.toDateString() === startTimeDate.toDateString() &&
        //         deadlineDate >= startTimeDate
        //     ) {
        //         setEndTime(newDeadline);
        //     } else {
        //         alert("End time must be on the same day and after Start time");
        //     }
        // }
    };

    const handleAddEvent = async () => {
        if (isValidField() && isValidTime()) {
            const params = {
                userId: userInfo._id,
                name,
                description: des,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
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
            };
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
