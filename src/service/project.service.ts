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
