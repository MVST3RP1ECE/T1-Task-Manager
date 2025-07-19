import type { TFormSchema } from "../lib/zod"

export type localStorageTasks = {
    state: {
        tasks: TFormSchema[]
    }
}

function loadTasksFromStorage() {
    const raw = localStorage.getItem("task-storage")
    return raw ? JSON.parse(raw) : { state: { tasks: [] } }
}

function saveTaskToStorage(tasks: TFormSchema[]) {
    localStorage.setItem("task-storage", JSON.stringify({ state: { tasks } }))
}

export const tasksAPI = {
    /**
     * Получение всех задач, имитация GET запроса
     */
    getAll(): Promise<TFormSchema[]> {
        const tasks: localStorageTasks = loadTasksFromStorage();

        // console.log(tasks.state.tasks);

        return Promise.resolve(tasks.state.tasks)
    },
    /**
     * Получение задачи по id, имитация GET запроса
     */
    getTaskById(id: string): Promise<TFormSchema | undefined> {
        const tasks: localStorageTasks = loadTasksFromStorage();

        console.log(tasks.state.tasks);

        return Promise.resolve(tasks.state.tasks.find(task => task.id === id))
    },
    /**
     * Создание задачи, имитация POST запроса
     */
    createTask(taskData: TFormSchema): Promise<TFormSchema> {
        const newTask: TFormSchema = {
            ...taskData,
            id: taskData.id
        }
        const tasks: localStorageTasks = loadTasksFromStorage();
        tasks.state.tasks.push(newTask);
        saveTaskToStorage(tasks.state.tasks)

        console.log(newTask);

        return Promise.resolve(newTask)
    },
    /**
     * Обновление задачи по id, имитация PATCH запроса
     */
    updateTask(id: string, updatedData: Partial<TFormSchema>): Promise<TFormSchema | undefined> {
        const tasks: localStorageTasks = loadTasksFromStorage();

        const taskIndex = tasks.state.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return Promise.resolve(undefined);
        tasks.state.tasks[taskIndex] = { ...tasks.state.tasks[taskIndex], ...updatedData };
        saveTaskToStorage(tasks.state.tasks);
        return Promise.resolve(tasks.state.tasks[taskIndex]);
    },
    /**
     * Удаление задачи по id, имитация DELETE запроса
     */
    deleteTask(id: string): Promise<boolean> {
        const tasks: localStorageTasks = loadTasksFromStorage();
        const filteredTasks = tasks.state.tasks.filter(task => task.id !== id);
        if (filteredTasks.length === tasks.state.tasks.length) return Promise.resolve(false);

        console.log(filteredTasks);

        saveTaskToStorage(filteredTasks);
        return Promise.resolve(true);
    }
};
