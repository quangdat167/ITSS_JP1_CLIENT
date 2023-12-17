import APIConfig from "utils/APIConfig";
import { POST } from "utils/url";

export const createProjectApi = (args: {
    userId: string;
    name: string;
    description: string;
    deadline: Date;
    wsId: string;
    memberId: string[];
}) => {
    return POST({
        url: APIConfig.CREATE_PROJECT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllTaskOfProjectApi = (args: { _id: string; userId: string }) => {
    return POST({
        url: APIConfig.GET_ALL_TASK_OF_PROJECT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
export const getAllUserOfProjectApi = (args: { _id: string }) => {
    return POST({
        url: APIConfig.GET_ALL_USER_OF_PROJECT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllProjectByUserApi = (args: { userId: string }) => {
    return POST({
        url: APIConfig.GET_ALL_PROJECT_BY_USER,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
