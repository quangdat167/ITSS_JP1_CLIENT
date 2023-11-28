import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import WorkspaceImage from "../../static/image/workspace/workspaceImage.png";
import { IWorkspace } from "redux/reducer/workspace";

export default function WorkspaceItem({ ws }: { ws: IWorkspace }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={WorkspaceImage} alt="workspace" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {ws.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {ws.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
