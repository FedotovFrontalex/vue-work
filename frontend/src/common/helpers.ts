import { DAY_IN_MILLISEC, TAG_SEPARATOR } from "./constants";
import TimeStatus from "./enums/timeStatuses";
import TaskStatus from "./enums/taskStatuses";

export const getTagsArrayFromStaring = (tags: string) => {
	const array = tags.split(TAG_SEPARATOR);
	return array.slice(1, array.length);
};

export const getTimeStatus = (dueDate: string): Nullable<TimeStatus> => {
	if (!dueDate) {
		return null;
	}

	const currentTime = +new Date();
	const taskTime = Date.parse(dueDate);
	const timeDelta = taskTime - currentTime;

	if (timeDelta > DAY_IN_MILLISEC) {
		return null;
	}

	return timeDelta < 0 ? TimeStatus.DEADLINE : TimeStatus.EXPIRED;
};

export const normalizeTask = (task: any) => {
	return {
		...task,
		status: task.statusId ? TaskStatus[task.statusId as 1 | 2 | 3] : null,
		timeStatus: getTimeStatus(task.dueDate),
	};
};
