import type { TContext } from "../types/types";
import { getCreatedTime } from "./getCreatedTime";

/**
 * Функция для установки времени создания задачи
 * @param task 
 * @returns string
 */
export function setCreatedTime(task: TContext) {
    const createdTime = task.createdAt;
    if (!createdTime) {
        return getCreatedTime();
    }
    return createdTime;
}