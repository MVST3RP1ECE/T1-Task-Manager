import TaskItem from '../../../entities/task/ui/TaskItem'
import { Button } from '@/shared/ui/button'
import { Link } from 'react-router-dom'
import generateTaskName from '@/shared/lib/generateTaskName'
import { useStore } from '@/app/stores/store'
import FilterTask from '@/features/task/filter-task'
import { useFilterStore } from '@/app/stores/useFilterStore'

/** 
Отображает список задач в виде адаптивной сетки карточек (Grid или Flexbox).
Каждая задача отображается через компонент TaskItem
*/

function TaskList() {
    const tasks = useStore((state) => state.tasks)
    const { status, category, priority } = useFilterStore();

    // Фильтрация задач
    const filteredTasks = tasks.filter(
        (tasks) =>
            (!status || tasks.status === status) &&
            (!category || tasks.category === category) &&
            (!priority || tasks.priority === priority)
    )
    return (
        <section className="min-h-screen w-full flex flex-col box-border items-center justify-end bg-neutral-200 overflow-auto p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row w-full mb-2 gap-2 bg-neutral-200 items-center justify-between p-2 sm:p-4">
                <h1 className="text-lg sm:text-2xl font-bold">Task Bar</h1>
                <div className="flex flex-col gap-2 bg-neutral-200
                lg:flex-row
                lg:justify-center
                sm:gap-4">
                    {/* Компонент с фильтрами */}
                    <FilterTask />
                    {/* Компонент с фильтрами */}
                    <Button className="hover:cursor-pointer" variant={'default'}>
                        <Link to={`task/${generateTaskName().number}`}>Создать задачу</Link>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full flex-1 bg-neutral-200 border-2 border-neutral-500 rounded-2xl p-2 sm:p-4">
                {/* <h1 className="text-base sm:text-xl font-semibold mb-2">Task List</h1> */}
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
        </section>
    )
}

export default TaskList
