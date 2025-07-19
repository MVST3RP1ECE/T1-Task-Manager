import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { TaskStore } from '@/shared/types/types'

/**
 * Хук для работы с состоянием задач
 */
// export const useStore = create<TaskStore>()(
//     persist(
//         devtools((set) => ({
//             tasks: [],
//             addTask: (task) =>
//                 set((state) => ({
//                     tasks: [...state.tasks, task],
//                 }), false, 'task/add'),

//             deleteTask: (id) =>
//                 set((state) => ({
//                     tasks: state.tasks.filter((task) => task.id !== id),
//                 }), false, 'task/delete'),

//             updateTask: (id, updatedTask) =>
//                 set((state) => ({
//                     tasks: state.tasks.map((task) =>
//                         task.id !== id ? task : updatedTask
//                     ),
//                 }), false, 'task/update'),
//         })),
//         {
//             name: 'task-storage', // имя ключа в localStorage
//         }
//     )
// )


/**
 * Стор без добавления задач в localstorage
 */
export const useStore = create<TaskStore>()(
    (set) => ({
        tasks: [],
        addTask: (task) =>
            set((state) => ({
                tasks: [...state.tasks, task],
            }), false),

        deleteTask: (id) =>
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            }), false),

        updateTask: (id, updatedTask) =>
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id !== id ? task : updatedTask
                ),
            }), false)
    }
    ))