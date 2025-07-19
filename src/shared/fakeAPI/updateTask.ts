import type { TFormSchema } from "../lib/zod";

export const updateTask = async (taskId: string, task: TFormSchema): Promise<TFormSchema> => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Ошибка при обновлении задачи");
    }

    return response.json();
};
