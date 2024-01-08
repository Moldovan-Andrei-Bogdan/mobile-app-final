import { listenerMiddleware } from "../../../../app/listener-middleware";
import db from "../../../../localdb/connection";
import { ActivityItem } from "../../../../model/core.model"
import { setOnline } from "../../../online-status/store/online-status-state";
import activityItemService from "./activity-item.service";

function activityItemLocalDbService() {
    const init = () => {
        listenerMiddleware.startListening({
            actionCreator: setOnline,
            effect: () => {
                migrateToServer();
            }
        });
    }

    const migrateToServer = async () => {
        const activities: ActivityItem[] = await getActivitiesToPersist();
        
        if (activities.length > 0) {
            activities.forEach(activity => activity.id = '');
            
            activityItemService.addActivities(activities).then(() => {
                alert("Offline added items were migrated to the server!");
                cleanActivitiesTable();
            }).catch((err) => alert(`Failed to migrate offline items to server: ${err.message}`));
        }
    }

    const getActivitiesToPersist = (): Promise<ActivityItem[]> => {
        return new Promise<ActivityItem[]>((resolve, reject) => {
            db.transaction(
                (tx) => {
                tx.executeSql(
                    'SELECT * FROM activitiessg',
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

    const cleanActivitiesTable = (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                    'DELETE FROM activitiessg',
                    [],
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

    const insertActivity = (payload: ActivityItem): Promise<ActivityItem> => {
        return new Promise<ActivityItem>((resolve, reject) => {
            const title = payload.title ? payload.title : '';
            const occurrenceDate = payload.occurrenceDate ? payload.occurrenceDate : '';
            const jiraLink = payload.jiraLink ? payload.jiraLink : '';
            const description = payload.description ? payload.description : '';
            const spentHours = payload.spentHours ? payload.spentHours : '';

            db.transaction(
                (tx) => {
                tx.executeSql(
                    'INSERT INTO activitiessg (title, occurrenceDate, jiraLink, description, spentHours) VALUES (?, ?, ?, ?, ?)',
                    [title, occurrenceDate, jiraLink, description, spentHours],
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

    return {
        init: init,
        insertActivity: insertActivity
    }
}

const activityItemLocalDbServiceInstance = activityItemLocalDbService();

export default activityItemLocalDbServiceInstance;