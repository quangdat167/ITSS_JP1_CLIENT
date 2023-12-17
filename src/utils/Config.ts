class Config {
    static USERTASK_ROLE_ADMIN = 1;
    static USERTASK_ROLE_MEMBER = 2;
    static USERTASK_ROLE_NONE = 0;
    static USERWORKSPACE_ROLE_ADMIN = 1;
    static USERWORKSPACE_ROLE_MEMBER = 2;
    static USERPROJECT_ROLE_ADMIN = 1;
    static USERPROJECT_ROLE_MEMBER = 2;

    static PRIORITY_HIGHEST = "highest";
    static PRIORITY_HIGH = "high";
    static PRIORITY_MEDIUM = "medium";
    static PRIORITY_NORMAL = "normal";
    static PRIORITY_LOW = "low";
    static PRIORITY_LOWEST = "lowest";

    static TASK_TYPE_INDIVIDUAL = "individual";
    static TASK_TYPE_GROUP = "group";

    static MODE_VIEW = "view";
    static MODE_EDIT = "edit";
    static MODE_CREATE = "create";

    static TASK_PROGRESS = {
        TO_DO: "To do",
        PROCESSING: "Processing",
        REVIEW: "Review",
        DONE: "Done",
    };
}

export default Config;
