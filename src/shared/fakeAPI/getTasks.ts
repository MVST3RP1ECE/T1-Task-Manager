import type { TFormSchema } from "../lib/zod";

type localStorageTasks = {
    state: {
        tasks: TFormSchema[]
    }
}

export const getTasks = () => {
    const tasks: localStorageTasks = JSON.parse(localStorage.getItem("task-storage") || "[]");
    // return new Promise((resolve, reject) => {
    //     console.log();
    // })
    console.log(tasks.state.tasks);

};
