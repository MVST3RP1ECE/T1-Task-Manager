import type { TFormSchema } from "../lib/zod";

export const getTaskById = async (taskId: string): Promise<TFormSchema> => {
    const response = await fetch(`/api/tasks/${taskId}`);
    if (!response.ok) {
        throw new Error("Ошибка получения задачи");
    }
    return response.json();
};
