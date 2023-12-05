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
import { JoinWorkspaceByCodeApi } from "service/workspace.service";
export default function PopupJoinWorkspace({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: Function;
}) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const [code, setCode] = useState("");

    const handleClose = () => {
        setCode("");
        setOpen(false);
    };

    const isValidField = () => {
        if (code.length > 0) {
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
                code,
            };

            const joinWs = await JoinWorkspaceByCodeApi(params);

            if (joinWs) {
                alert(joinWs.message);
                if (joinWs.message === "Joined workspace") {
                    window.location.reload();
                }
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
                <DialogTitle>JOIN WORKSPACE</DialogTitle>

                <DialogContent className="content-wrapper">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        label="Code"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddWorkspace} variant="contained">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
