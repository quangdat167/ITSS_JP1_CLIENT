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

export const getAllTaskByUserIdApi = (args: { userId: string }) => {
    return POST({
        url: APIConfig.GET_ALL_TASK_BY_USERID,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const updateTaskApi = (args: {
    taskId: string;
    status?: string;
    name?: string;
    description?: string;
    startTime?: Date;
    deadline?: Date;
    priority?: string;
}) => {
    return POST({
        url: APIConfig.UPDATE_TASK,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const deleteTaskApi = (args: { taskId: string }) => {
    return POST({
        url: APIConfig.DELETE_TASK,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
