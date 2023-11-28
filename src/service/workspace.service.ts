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
