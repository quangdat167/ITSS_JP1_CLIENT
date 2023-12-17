import APIConfig from "utils/APIConfig";
import { POST } from "utils/url";

export const createEventApi = (args: {
    userId: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    wsId?: string;
}) => {
    return POST({
        url: APIConfig.CREATE_EVENT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllEventByUserIdApi = (args: { userId: string }) => {
    return POST({
        url: APIConfig.GET_EVENT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const editEventByUserIdApi = (args: {
    _id: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    wsId?: string;
}) => {
    return POST({
        url: APIConfig.EDIT_EVENT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const deleteEventByUserIdApi = (args: { _id: string }) => {
    return POST({
        url: APIConfig.DELETING_EVENT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getEventByWsApi = (args: { userId: string; selectedWs?: string[] }) => {
    return POST({
        url: APIConfig.GET_EVENT_BY_WS,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
