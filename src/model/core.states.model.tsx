import { ActivityItem } from "./core.model";
import { HttpErrorModel } from "./core.occ.model";

type ActivityListState = {
    data: ActivityItem[] | null;
    loading: boolean;
    error?: HttpErrorModel | null | undefined;
}

type ActivityItemState = {
    data: ActivityItem;
    loading: boolean;
    error?: HttpErrorModel | null | undefined;
}

export { ActivityListState, ActivityItemState }