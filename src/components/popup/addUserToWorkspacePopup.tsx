import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FindUserInput from "components/find-user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getAllUserEmailApi } from "service/authen.service";
import { addUserToWorkspaceApi } from "service/workspace.service";
import "./styles.scss";
export default function PopupAddUserToWorkspace({
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

    const [member, setMember] = useState<any>([]);
    const [allUsers, setAllUsers] = useState([]);

    const handleClose = () => {
        setMember([]);
        setOpen(false);
    };

    useEffect(() => {
        // getAllUserOfWorkspaceApi;
    }, []);

    const handleAddWorkspace = async () => {
        const params = {
            wsId,
            memberId: member
                .filter((e: any) => !userOfWs.find((u: any) => u.email === e.email))
                .map((e: any) => e._id),
        };

        const newuserWs = await addUserToWorkspaceApi(params);

        if (newuserWs) {
            handleClose();
            window.location.reload();
        }
    };

    const getAllUser = async () => {
        const allUser = await getAllUserEmailApi();
        if (allUser.length) {
            setAllUsers(allUser);
        }
    };
    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <>
            <Dialog
                className="dialog-add-event-wrapper"
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth={true}
            >
                <DialogTitle>ADD USER TO WORKSPACE</DialogTitle>

                <DialogContent className="content-wrapper">
                    <div className="mt-3">
                        <FindUserInput
                            value={member}
                            setValue={setMember}
                            fixedUser={userOfWs}
                            allUsers={allUsers}
                            disabledUsers={userOfWs}
                        />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddWorkspace} variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
