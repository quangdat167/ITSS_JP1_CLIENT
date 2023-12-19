import APIConfig from "utils/APIConfig";
import { POST } from "utils/url";

export const createWorkspaceApi = (args: { userId: string; name: string; description: string }) => {
    return POST({
        url: APIConfig.CREATE_WORKSPACE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getWorkspaceByUserIdApi = (args: { userId: string }) => {
    return POST({
        url: APIConfig.GET_WORKSPACE_BY_USERID,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getDetailWorkspaceByIdApi = (args: { _id: string }) => {
    return POST({
        url: APIConfig.GET_DETAIL_WORKSPACE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const JoinWorkspaceByCodeApi = (args: { userId: string; code: string }) => {
    return POST({
        url: APIConfig.JOIN_WORKSPACE_BY_CODE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllUserOfWorkspaceApi = (args: { wsId: string }) => {
    return POST({
        url: APIConfig.GET_ALL_USER_OF_WORKSPACE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const addUserToWorkspaceApi = (args: { wsId: string; memberId: string[] }) => {
    return POST({
        url: APIConfig.ADD_USER_TO_WORKSPACE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllTaskOfWsApi = (args: { wsId: string }) => {
    return POST({
        url: APIConfig.GET_ALL_TASK_OF_WORKSPACE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const outWsApi = (args: { wsId: string; userId: string }) => {
    return POST({
        url: APIConfig.OUT_WORKSPACE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
