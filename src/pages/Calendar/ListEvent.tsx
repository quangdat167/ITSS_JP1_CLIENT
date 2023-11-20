import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useState } from "react";
import PopupAddEvent from "./popup/addEventPopup";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { IEvent } from "redux/reducer/event";
import Config from "utils/Config";
function ListEvent() {
    const [openPopupAddEvent, setOpenPopupAddEvent] = useState(false);
    const listEvent = useSelector((state: RootState) => state.eventState);
    const [selectedEvent, setSelectedEvent] = useState({} as IEvent);
    const [mode, setMode] = useState("");

    return (
        <div className="list-event-wrapper">
            <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <div className="header">Event</div>

                <nav className="list-event" aria-label="secondary mailbox folders">
                    <List>
                        {listEvent.map((event, index) => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        setOpenPopupAddEvent(true);
                                        setSelectedEvent(event);
                                        setMode(Config.MODE_VIEW_EVENT);
                                    }}
                                >
                                    <ListItemText primary={event.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>

                <div className="add-event">
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<AddTaskIcon />}
                        onClick={() => {
                            setOpenPopupAddEvent(true);
                            setMode(Config.MODE_CREATE_EVENT);
                        }}
                    >
                        Create new event
                    </Button>
                </div>
            </Box>
            <PopupAddEvent
                selectedEvent={selectedEvent}
                mode={mode}
                setMode={setMode}
                open={openPopupAddEvent}
                setOpen={setOpenPopupAddEvent}
            />
        </div>
    );
}

export default ListEvent;
