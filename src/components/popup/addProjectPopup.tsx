import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FindUserInput from "components/find-user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { createProjectApi } from "service/project.service";
import "./styles.scss";
export default function PopupAddProject({
    open,
    setOpen,
    wsId,
    userOfWs,
}: {
    open: boolean;
    setOpen: Function;
    wsId: string;
    userOfWs: any;
}) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [deadline, setDeadline] = useState("");

    const [member, setMember] = useState<any>([]);

    const handleClose = () => {
        setName("");
        setDes("");
        setDeadline("");
        setMember([]);
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

    useEffect(() => {
        // getAllUserOfWorkspaceApi;
    }, []);

    const handleAddWorkspace = async () => {
        if (isValidField()) {
            const params = {
                userId: userInfo._id,
                name,
                description: des,
                deadline: new Date(deadline),
                wsId,
                memberId: member.filter((e: any) => e._id !== userInfo._id).map((e: any) => e._id),
            };

            const newPrj = await createProjectApi(params);

            if (newPrj) {
                handleClose();
                window.location.reload();
            }
        }
    };

    return (
        <>
            <Dialog
                className="dialog-add-event-wrapper"
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth={true}
            >
                <DialogTitle>CREATE NEW PROJECT</DialogTitle>

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
                    <div className="mt-3 d-flex align-items-center gap-2">
                        <div className="lable">Deadline:</div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="deadline"
                            type="datetime-local"
                            variant="standard"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <FindUserInput
                            value={member}
                            setValue={setMember}
                            fixedUser={userOfWs}
                            disabledUsers={[
                                userOfWs.find((option: any) => option.email === userInfo.email),
                            ]}
                        />
                    </div>
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
