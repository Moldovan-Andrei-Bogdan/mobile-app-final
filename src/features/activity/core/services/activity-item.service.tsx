import { rejects } from "assert";
import { ActivityItem } from "../../../../model/core.model";
import { HttpErrorModel } from "../../../../model/core.occ.model";

let activityList: ActivityItem[] = [
    {
        id: "dasdsahjfbd",
        title: "First Jira Task",
        description: "Nan",
        jiraLink: "https://google.com",
        occurenceDate: "12.12.2020",
        spentHours: "10"
    },

    {
        id: "dasdsahfdfssd",
        title: "Second Jira Task",
        description: "Nannnnnn",
        jiraLink: "https://googleeee.com",
        occurenceDate: "12.10.2020",
        spentHours: "25"
    }
];

let index = 2;

function ActivityItemService() {
    const getActivitiesList = (): Promise<ActivityItem[] | HttpErrorModel | null> => {
        return new Promise<ActivityItem[] | HttpErrorModel | null>((resolve, reject) => {
            setTimeout(() => {
                resolve(activityList);
            }, 3000)
        });
    }

    const deleteActivityItem = (id: string): Promise<string | HttpErrorModel | null> => {
        return new Promise<string | HttpErrorModel | null>((resolve, reject) => {
            setTimeout(() => {
                activityList = activityList.filter((activity) => activity.id !== id);
                resolve('este ba');
            }, 3000);
        });
    }

    const addActivityItem = (payload: ActivityItem) => {
        console.log(payload);
        payload.id = index.toString();
        index += 1;

        return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
            setTimeout(() => {
                activityList = [ ...activityList, payload ]
                resolve(payload);
            }, 3000);
        });
    }

    const getActivityById = (id: string) => {
        return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
            setTimeout(() => {
                const activity: ActivityItem = activityList.filter(activity => activity.id === id)[0];
                resolve(activity);
            }, 2000)
        });
    }

    const updateActivityItem = (payload: ActivityItem) => {
        return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
            setTimeout(() => {
                const newItemList: ActivityItem[] = [];

                activityList.forEach((activity) => {
                    if (activity.id === payload.id) {
                        newItemList.push(payload);
                    } else {
                        newItemList.push(activity);
                    }
                });
                
                activityList = newItemList;

                resolve(payload);
            }, 2000);
        });
    }

    return {
        getActivitiesList: getActivitiesList,
        deleteActivityItem: deleteActivityItem,
        addActivityItem: addActivityItem,
        getActivityById: getActivityById,
        updateActivityItem: updateActivityItem
    }
}

const activityItemService = ActivityItemService();

export default activityItemService;