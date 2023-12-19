import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IUserWorkspace } from "pages/Workspace/detail";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IUserInfo } from "redux/reducer/userinfo";
import { IWorkspace } from "redux/reducer/workspace";
import { RootState } from "redux/store";
import { outWsApi } from "service/workspace.service";
import Config from "utils/Config";

const columns: GridColDef[] = [
    //     { field: "id", headerName: "ID", width: 70 },
    //     { field: "firstName", headerName: "First name", width: 100 },
    //     { field: "lastName", headerName: "Last name", width: 100 },
    {
        field: "name",
        headerName: "Name",
        width: 200,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "email", headerName: "Email", width: 500 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "action", headerName: "", width: 50 },
];

export default function TableUserInWorkspace({
    userInfos,
    open,
    setOpen,
    roleInWs,
    workspace,
    members,
}: {
    userInfos: IUserInfo[];
    open: boolean;
    setOpen: Function;
    roleInWs: number;
    workspace: IWorkspace;
    members: IUserWorkspace[];
}) {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [rows, setRows] = useState<any[]>([]);
    const handleClose = () => {
        setOpen(false);
    };

    if (userInfos?.length && rows.length === 0) {
        userInfos?.map((user, id) => {
            const role = members.find((mem) => mem.userId === user._id)?.role;
            setRows((rows) => [
                ...rows,
                {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: role === Config.USERWORKSPACE_ROLE_ADMIN ? "admin" : "member",
                    action:
                        roleInWs === Config.USERWORKSPACE_ROLE_ADMIN &&
                        role !== Config.USERWORKSPACE_ROLE_ADMIN
                            ? "X"
                            : "",
                },
            ]);
        });
    }

    const handleOutWs = async (userId: string) => {
        const shouldDelete = window.confirm("Remove user from workspace?");
        if (shouldDelete) {
            await outWsApi({ wsId: workspace._id, userId });
            window.location.reload();
        }
    };

    return (
        <Dialog
            className="dialog-add-event-wrapper"
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth={true}
        >
            <DialogTitle>ALL USER OF WORKSPACE</DialogTitle>

            <DialogContent className="content-wrapper">
                <div style={{ height: 400, width: "100%" }}>
                    {rows.length > 0 && (
                        <DataGrid
                            rows={rows}
                            rowSelection={false}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            onCellClick={(e) => {
                                if (e.field === "action" && e.value === "X") {
                                    handleOutWs(e.row.id);
                                }
                            }}
                            pageSizeOptions={[5, 10]}
                            // checkboxSelection
                        />
                    )}
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
