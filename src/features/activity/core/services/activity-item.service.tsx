import { ActivityItem } from "../../../../model/core.model";
import { HttpErrorModel } from "../../../../model/core.occ.model";

import db, { initDatabase } from "../../../../localdb/connection";

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

initDatabase();

function ActivityItemService() {
    // const getActivitiesList = (): Promise<ActivityItem[] | HttpErrorModel | null> => {
    //     return new Promise<ActivityItem[] | HttpErrorModel | null>((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve(activityList);
    //         }, 3000)
    //     });
    // }

    const getActivitiesList = (): Promise<ActivityItem[] | HttpErrorModel | null> => {
        return new Promise<ActivityItem[] | HttpErrorModel | null>((resolve, reject) => {
            db.transaction(
                (tx) => {
                  tx.executeSql(
                    'SELECT * FROM activitiesg',
                    [],
                    (_, { rows }) => {
                      const activities = rows._array || [];
                      console.log(activities);

                      resolve(activities);
                    },
                    (error) => {
                      console.error('Error loading activities from the database:', error);
                      reject(error);

                      return true;
                    }
                  );
                },
                undefined,
                () => console.log('Get activities transaction completed successfully.')
              );
        });
    }

    // const deleteActivityItem = (id: string): Promise<string | HttpErrorModel | null> => {
    //     return new Promise<string | HttpErrorModel | null>((resolve, reject) => {
    //         setTimeout(() => {
    //             activityList = activityList.filter((activity) => activity.id !== id);
    //             resolve('este ba');
    //         }, 3000);
    //     });
    // }

    const deleteActivityItem = (id: string): Promise<string | HttpErrorModel | null> => {
        return new Promise<string | HttpErrorModel | null>((resolve, reject) => {
            db.transaction(
                (tx) => {
                  tx.executeSql(
                    'DELETE FROM activitiesg WHERE id = ?',
                    [id],
                    (_, { rowsAffected }) => {
                      if (rowsAffected > 0) {
                        resolve('este ba');
                      }
                    },
                    (error) => {
                      console.error('Error removing a book from the database:', error);
                      reject(error);

                      return true;
                    }
                  );
                },
                undefined,
                () => console.log('Remove book transaction completed successfully.')
              );
        });
    }

    // const addActivityItem = (payload: ActivityItem) => {
    //     console.log(payload);
    //     payload.id = index.toString();
    //     index += 1;

    //     return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
    //         setTimeout(() => {
    //             activityList = [ ...activityList, payload ]
    //             resolve(payload);
    //         }, 3000);
    //     });
    // }

    const addActivityItem = (payload: ActivityItem) => {
        console.log(payload);

        return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
            db.transaction(
                (tx) => {
                  tx.executeSql(
                    'INSERT INTO activitiesg (title, occurenceDate, jiraLink, description, spentHours) VALUES (?, ?, ?, ?, ?)',
                    [payload.title, payload.occurenceDate, payload.jiraLink, payload.description, payload.spentHours],
                    (_, { insertId }) => {
                        if (insertId) {
                            payload.id = insertId.toString();
                        }

                        resolve(payload)
                    },
                    (error) => {
                      console.error('Error adding a book to the database:', error);

                      reject(error);

                      return true;
                    }
                  );
                },
                undefined,
                () => console.log('Add book transaction completed successfully.')
              );
        });
    }

    // const getActivityById = (id: string) => {
    //     return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
    //         setTimeout(() => {
    //             const activity: ActivityItem = activityList.filter(activity => activity.id === id)[0];
    //             resolve(activity);
    //         }, 2000)
    //     });
    // }

    const getActivityById = (id: string) => {
        return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
            db.transaction(
                (tx) => {
                  tx.executeSql(
                    'SELECT * FROM activitiesg WHERE id = ?',
                    [id],
                    (_, { rows }) => {
                      const activity = rows._array && rows._array[0];
                      console.log(activity);
        
                      resolve(activity);
                    },
                    (error) => {
                      console.error('Error loading a activity from the database:', error);
                      reject(error);

                      return true;
                    }
                  );
                },
                undefined,
                () => console.log('Get activity by ID transaction completed successfully.')
              );
        });
    }

    // const updateActivityItem = (payload: ActivityItem) => {
    //     return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
    //         setTimeout(() => {
    //             const newItemList: ActivityItem[] = [];

    //             activityList.forEach((activity) => {
    //                 if (activity.id === payload.id) {
    //                     newItemList.push(payload);
    //                 } else {
    //                     newItemList.push(activity);
    //                 }
    //             });
                
    //             activityList = newItemList;

    //             resolve(payload);
    //         }, 2000);
    //     });
    // }

    const updateActivityItem = (payload: ActivityItem) => {
        return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
            db.transaction(
                (tx) => {
                  tx.executeSql(
                    'UPDATE activitiesg SET title=?, occurenceDate=?, jiraLink=?, description=?, spentHours=? WHERE id=?',
                    [payload.title, payload.occurenceDate, payload.jiraLink, payload.description, payload.spentHours, payload.id],
                    (_, { rowsAffected }) => {
                      if (rowsAffected > 0) {
                        resolve(payload);
                      }
                    },
                    (error) => {
                      console.error('Error updating a book in the database:', error);
                      reject(error);

                      return true;
                    }
                  );
                },
                undefined,
                () => console.log('Update book transaction completed successfully.')
              );
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