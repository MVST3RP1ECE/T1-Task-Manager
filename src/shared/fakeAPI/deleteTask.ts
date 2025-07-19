export const deleteTask = async (taskId: string): Promise<void> => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Ошибка при удалении задачи");
    }
};
