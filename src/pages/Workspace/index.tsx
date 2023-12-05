import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PopupAddWorkspace from "components/popup/addWorkspacePopup";
import PopupJoinWorkspace from "components/popup/joinWorkspacePopup";
import WorkspaceItem from "components/workspace-item";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IWorkspace } from "redux/reducer/workspace";
import { RootState } from "redux/store";
import { getWorkspaceByUserIdApi } from "service/workspace.service";
export interface Workspace {
    _id: string;
    role: number;
    userId?: string;
    workspace: IWorkspace;
}

export const WorkspacePage = () => {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const listWorkspace = useSelector((state: RootState) => state.workspaceState);
    const [listWs, setListWs] = useState([] as Workspace[]);
    const [openPopupAddWorkspace, setOpenPopupAddWorkspace] = useState(false);
    const [openPopupJoinWorkspace, setOpenPopupJoinWorkspace] = useState(false);

    useEffect(() => {
        const getWs = async () => {
            let ws: Workspace[] = await getWorkspaceByUserIdApi({ userId: userInfo?._id });
            if (ws.length > 0) {
                // ws.forEach((item) => setListWs((ws) => [...ws, item.workspace]));
                setListWs(ws);
            }
        };
        userInfo?.email && getWs();
    }, [userInfo?.email]);
    return (
        <div className="p-3">
            <div className="d-flex justify-content-between">
                <div className="fs-3 fw-medium">My Workspace</div>
                <div className="d-flex gap-2">
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenPopupAddWorkspace(true);
                            // setMode(Config.MODE_CREATE_EVENT);
                        }}
                    >
                        Create new workspace
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LoginIcon />}
                        onClick={() => {
                            setOpenPopupJoinWorkspace(true);
                            // setMode(Config.MODE_CREATE_EVENT);
                        }}
                    >
                        Join workspace by code
                    </Button>
                </div>
            </div>

            <Grid className="mt-2" container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {listWs.map((ws, index) => (
                    <Grid
                        key={index}
                        item
                        xs={3}
                        onClick={() => {
                            window.open(`/workspace/${ws.workspace._id}`, "_self");
                        }}
                    >
                        <WorkspaceItem ws={ws.workspace} />
                    </Grid>
                ))}
            </Grid>
            <PopupAddWorkspace open={openPopupAddWorkspace} setOpen={setOpenPopupAddWorkspace} />
            <PopupJoinWorkspace open={openPopupJoinWorkspace} setOpen={setOpenPopupJoinWorkspace} />
        </div>
    );
};
