import type { TFormSchema } from "../lib/zod";

export const createTask = async (task: TFormSchema): Promise<TFormSchema> => {
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Ошибка при создании задачи");
    }

    return response.json();
};
