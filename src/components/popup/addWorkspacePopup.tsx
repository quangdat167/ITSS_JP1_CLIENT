import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import "./styles.scss";
import { createWorkspaceApi } from "service/workspace.service";
import { addWorkspace } from "redux/reducer/workspace";
export default function PopupAddWorkspace({ open, setOpen }: { open: boolean; setOpen: Function }) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const [name, setName] = useState("");
    const [des, setDes] = useState("");

    const handleClose = () => {
        setName("");
        setDes("");
        setOpen(false);
    };

    const isValidField = () => {
        if (name.length > 0) {
            return true;
        } else {
            alert("Please fill in all information");
            return false;
        }
    };

    const handleAddWorkspace = async () => {
        if (isValidField()) {
            const params = {
                userId: userInfo._id,
                name,
                description: des,
            };

            const newWs = await createWorkspaceApi(params);

            if (newWs) {
                dispatch(addWorkspace([newWs]));
                handleClose();
            }
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
                <DialogTitle>CREATE NEW WORKSPACE</DialogTitle>

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
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddWorkspace} variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
