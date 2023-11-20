import APIConfig from "utils/APIConfig";
import { POST } from "utils/url";

export const createTaskApi = (args: {
    userId: string;
    name: string;
    description: string;
    startTime: Date;
    deadline: Date;
    priority: string;
    workspaceId?: string;
    type: string;
    projectId?: string;
    memberId?: string[];
}) => {
    return POST({
        url: APIConfig.CREATE_TASK,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
