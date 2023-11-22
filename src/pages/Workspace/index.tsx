import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PopupAddWorkspace from "components/popup/addWorkspacePopup";
import WorkspaceItem from "components/workspace-item";
import { useState } from "react";

export const WorkspacePage = () => {
    const [openPopupAddTask, setOpenPopupAddTask] = useState(false);
    return (
        <div className="p-3">
            <div className="d-flex justify-content-between">
                <div className="fs-3 fw-medium">My Workspace</div>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setOpenPopupAddTask(true);
                        // setMode(Config.MODE_CREATE_EVENT);
                    }}
                >
                    Create new workspace
                </Button>
            </div>

            <Grid className="mt-2" container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                    <WorkspaceItem />
                </Grid>
                <Grid item xs={3}>
                    <WorkspaceItem />
                </Grid>
                <Grid item xs={3}>
                    <WorkspaceItem />
                </Grid>
                <Grid item xs={3}>
                    <WorkspaceItem />
                </Grid>
                <Grid item xs={3}>
                    <WorkspaceItem />
                </Grid>
                <Grid item xs={3}>
                    <WorkspaceItem />
                </Grid>
                <Grid item xs={3}>
                    <WorkspaceItem />
                </Grid>
            </Grid>
            <PopupAddWorkspace open={openPopupAddTask} setOpen={setOpenPopupAddTask} />
        </div>
    );
};
