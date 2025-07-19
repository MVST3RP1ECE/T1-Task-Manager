import TaskItem from '../../../entities/task/ui/TaskItem'
import { Button } from '@/shared/ui/button'
import { Link } from 'react-router-dom'
import generateTaskName from '@/shared/lib/generateTaskName'
import FilterTask from '@/features/task/filter-task'
import { useFilterStore } from '@/app/stores/useFilterStore'
import { useEffect } from 'react'
import type { localStorageTasks } from '@/shared/fakeAPI'

/** 
Отображает список задач в виде адаптивной сетки карточек (Grid или Flexbox).
Каждая задача отображается через компонент TaskItem
*/

function TaskList() {
    // FAKE API: "GET" запрос на полдучение всех существующих задач из localStorage
    const tasks1: localStorageTasks = JSON.parse(localStorage.getItem("task-storage") || '{"state":{"tasks":[]}}')

    const { status, category, priority } = useFilterStore();
    // Добавить получение debouncedSearch, если оно есть в useFilterStore
    const debouncedSearch = useFilterStore.getState().debouncedSearch || '';

    // Фильтрация задач
    const filteredTasks = tasks1.state.tasks.filter(
        (task) =>
            (!status || task.status === status) &&
            (!category || task.category === category) &&
            (!priority || task.priority === priority) &&
            (!debouncedSearch ||
                task.header.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                task.id.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
    )

    useEffect(() => {
        console.log(tasks1.state.tasks);

    }, [tasks1])

    return (
        <section className="min-h-screen w-full flex flex-col box-border items-center justify-end bg-neutral-200 overflow-auto p-2 sm:p-4">
            <div
                className="flex flex-col w-full mb-2 gap-2 bg-neutral-200 items-center justify-between p-2
                overflow-ellipsis
                sm:flex-col sm:justify-center sm:p-4 sm:overflow-visible
                md:flex-row md:items-center md:justify-between md:gap-4
                lg:flex-row lg:items-center lg:justify-between lg:gap-4"
            >
                <h1 className="text-lg sm:text-2xl font-bold">Task Bar</h1>
                <div
                    className="flex flex-col gap-2 bg-neutral-200
                    sm:gap-4 sm:w-full
                    md:flex-row md:items-center md:gap-4
                    lg:flex-row lg:items-center lg:gap-4"
                >
                    {/* Компонент с фильтрами */}
                    <FilterTask />
                    <Button className="hover:cursor-pointer" variant={'default'}>
                        <Link to={`task/${generateTaskName().number}`}>Создать задачу</Link>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full flex-1 bg-neutral-200 border-2 border-neutral-500 rounded-2xl p-2 sm:p-4">
                <div
                    className="grid grid-cols-1 gap-4
                sm:grid-cols-2 max-sm:place-items-center max-sm:gap-2
                lg:grid-cols-3 max-lg:place-items-center max-lg:gap-2
                xl:grid-cols-4 
                2xl:grid-cols-6
                "
                >
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </section >
    )
}

export default TaskList
