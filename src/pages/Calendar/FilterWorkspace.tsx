import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Workspace } from "pages/Workspace";
import { getWorkspaceByUserIdApi } from "service/workspace.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { IWorkspace } from "redux/reducer/workspace";
import { getEventByWsApi } from "service/event.service";
import { updateEvent } from "redux/reducer/event";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            //     width: 250,
        },
    },
};

export default function FilterWorkspace() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [listWs, setListWs] = useState([] as IWorkspace[]);
    useEffect(() => {
        const getWs = async () => {
            let ws: Workspace[] = await getWorkspaceByUserIdApi({ userId: userInfo?._id });
            if (ws.length > 0) {
                setListWs(ws.map((w) => w.workspace));
            }
        };
        userInfo?.email && getWs();
    }, [userInfo?.email]);

    const [selectedWs, setSelectedWs] = useState<string[]>([]);

    const handleChange = (e: any) => {
        setSelectedWs(e.target.value);
    };

    useEffect(() => {
        const getEvents = async (selectedWs: any) => {
            const result = await getEventByWsApi({ selectedWs, userId: userInfo._id });
            dispatch(updateEvent(result));
        };
        if (selectedWs.includes("all")) {
            const allId = listWs.map((ws) => ws._id);

            if (allId.length) return setSelectedWs([...allId]);
        }
        if (selectedWs.includes("none")) {
            setSelectedWs([]);
            getEvents([]);
        } else getEvents(selectedWs);
    }, [selectedWs]);

    return (
        <>
            <FormControl sx={{ m: 1, width: "100%", margin: 0 }}>
                <InputLabel id="demo-multiple-name-label">Workspace</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedWs}
                    onChange={handleChange}
                    input={<OutlinedInput label="Workspace" />}
                    MenuProps={MenuProps}
                >
                    <MenuItem value={"none"}>None</MenuItem>

                    <MenuItem value={"all"}>All</MenuItem>
                    {listWs.map((ws, id) => (
                        <MenuItem key={id} value={ws._id}>
                            {ws.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
