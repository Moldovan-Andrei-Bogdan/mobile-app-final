import { ActivityItem } from "../../../../model/core.model";
import { HttpErrorModel } from "../../../../model/core.occ.model";

import db, { initDatabase } from "../../../../localdb/connection";
import axios from "axios";
import { error } from "console";
import { ActivityListState } from "../../../../model/core.states.model";
import { useSelector } from "react-redux";
import { Url } from "url";

// initDatabase();

const serverUrl = "http://localhost:8080/api/v1/activities";

function ActivityItemService() {
    const getActivitiesList = (): Promise<ActivityItem[] | null | any> => {
        return axios.get<ActivityItem[] | null>(serverUrl);
    }

    const deleteActivityItem = (id: string): Promise<ActivityItem | null | any> => {
        const url = `${serverUrl}/${id}`;

        return axios.delete<ActivityItem | null>(url);
    }

    const addActivityItem = (payload: ActivityItem) => {
        return axios.post<ActivityItem | null>(serverUrl, payload);
    }

    const addActivities = (payload: ActivityItem[]) => {
        const url = `${serverUrl}?multiple=true`;

        return axios.post<ActivityItem[] | null>(url, payload);
    }

    const getActivityById = (id: string) => {
        const url = `${serverUrl}/${id}`;

        return axios.get<ActivityItem | null>(url);
    }

    const updateActivityItem = (payload: ActivityItem) => {
        const id = payload.id;
        const url = `${serverUrl}/${id}`;
        payload.id = '';

        return axios.put<ActivityItem | null>(url, payload);
    }

    return {
        getActivitiesList: getActivitiesList,
        deleteActivityItem: deleteActivityItem,
        addActivityItem: addActivityItem,
        addActivities: addActivities,
        getActivityById: getActivityById,
        updateActivityItem: updateActivityItem
    }
}

const activityItemService = ActivityItemService();

export default activityItemService;


// const getActivitiesList = (): Promise<ActivityItem[] | HttpErrorModel | null> => {
//   return new Promise<ActivityItem[] | HttpErrorModel | null>((resolve, reject) => {
//       db.transaction(
//           (tx) => {
//             tx.executeSql(
//               'SELECT * FROM activitiesg',
//               [],
//               (_, { rows }) => {
//                 const activities = rows._array || [];
//                 console.log(activities);

//                 resolve(activities);
//               },
//               (error) => {
//                 console.error('Error loading activities from the database:', error);
//                 reject(error);

//                 return true;
//               }
//             );
//           },
//           undefined,
//           () => console.log('Get activities transaction completed successfully.')
//         );
//   });
// }


// const deleteActivityItem = (id: string): Promise<string | HttpErrorModel | null> => {
//   return new Promise<string | HttpErrorModel | null>((resolve, reject) => {
//       db.transaction(
//           (tx) => {
//             tx.executeSql(
//               'DELETE FROM activitiesg WHERE id = ?',
//               [id],
//               (_, { rowsAffected }) => {
//                 if (rowsAffected > 0) {
//                   resolve('este ba');
//                 }
//               },
//               (error) => {
//                 console.error('Error removing a book from the database:', error);
//                 reject(error);

//                 return true;
//               }
//             );
//           },
//           undefined,
//           () => console.log('Remove book transaction completed successfully.')
//         );
//   });
// }


    // const addActivityItem = (payload: ActivityItem) => {
    //     console.log(payload);

    //     return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
    //         db.transaction(
    //             (tx) => {
    //               tx.executeSql(
    //                 'INSERT INTO activitiesg (title, occurrenceDate, jiraLink, description, spentHours) VALUES (?, ?, ?, ?, ?)',
    //                 [payload.title, payload.occurenceDate, payload.jiraLink, payload.description, payload.spentHours],
    //                 (_, { insertId }) => {
    //                     if (insertId) {
    //                         payload.id = insertId.toString();
    //                     }

    //                     resolve(payload)
    //                 },
    //                 (error) => {
    //                   console.error('Error adding a book to the database:', error);

    //                   reject(error);

    //                   return true;
    //                 }
    //               );
    //             },
    //             undefined,
    //             () => console.log('Add book transaction completed successfully.')
    //           );
    //     });
    // }


        // const getActivityById = (id: string) => {
    //     return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
    //         db.transaction(
    //             (tx) => {
    //               tx.executeSql(
    //                 'SELECT * FROM activitiesg WHERE id = ?',
    //                 [id],
    //                 (_, { rows }) => {
    //                   const activity = rows._array && rows._array[0];
    //                   console.log(activity);
        
    //                   resolve(activity);
    //                 },
    //                 (error) => {
    //                   console.error('Error loading a activity from the database:', error);
    //                   reject(error);

    //                   return true;
    //                 }
    //               );
    //             },
    //             undefined,
    //             () => console.log('Get activity by ID transaction completed successfully.')
    //           );
    //     });
    // }


        // const updateActivityItem = (payload: ActivityItem) => {
    //     return new Promise<ActivityItem | HttpErrorModel | null>((resolve, reject) => {
    //         db.transaction(
    //             (tx) => {
    //               tx.executeSql(
    //                 'UPDATE activitiesg SET title=?, occurenceDate=?, jiraLink=?, description=?, spentHours=? WHERE id=?',
    //                 [payload.title, payload.occurenceDate, payload.jiraLink, payload.description, payload.spentHours, payload.id],
    //                 (_, { rowsAffected }) => {
    //                   if (rowsAffected > 0) {
    //                     resolve(payload);
    //                   }
    //                 },
    //                 (error) => {
    //                   console.error('Error updating a book in the database:', error);
    //                   reject(error);

    //                   return true;
    //                 }
    //               );
    //             },
    //             undefined,
    //             () => console.log('Update book transaction completed successfully.')
    //           );
    //     });
    // }