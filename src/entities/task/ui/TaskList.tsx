import TaskItem from '../../../entities/task/ui/TaskItem'
import { Button } from '@/shared/ui/button'
import { Link } from 'react-router-dom'
import type { TCategory, TPriority, TStatus } from '@/shared/types/types'
import generateTaskName from '@/shared/lib/generateTaskName'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select'
import { useStore } from '@/app/store'

/** 
Отображает список задач в виде адаптивной сетки карточек (Grid или Flexbox).

Каждая задача отображается через компонент TaskItem
*/

function TaskList() {
    // const { state } = useContext<TContextType>(Context)
    const tasks = useStore((state) => state.tasks)

    const [statusFilter, setStatusFilter] = useState<string>('')
    const [categoryFilter, setCategoryFilter] = useState<string>('')
    const [priorityFilter, setPriorityFilter] = useState<string>('')

    const statusList: Array<TStatus> = ['To Do', 'In Progress', 'Done']
    const categoryList: Array<TCategory> = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']
    const priorityList: Array<TPriority> = ['Low', 'Medium', 'High']

    // Фильтрация задач
    const filteredTasks = tasks.filter(
        (tasks) =>
            (!statusFilter || tasks.status === statusFilter) &&
            (!categoryFilter || tasks.category === categoryFilter) &&
            (!priorityFilter || tasks.priority === priorityFilter)
    )

    // Сброс фильтров
    const resetFilters = () => {
        setStatusFilter('')
        setCategoryFilter('')
        setPriorityFilter('')
    }

    return (
        <section className="min-h-screen w-full flex flex-col box-border items-center justify-end bg-neutral-200 overflow-auto p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row w-full mb-2 gap-2 bg-neutral-200 items-center justify-between p-2 sm:p-4">
                <h1 className="text-lg sm:text-2xl font-bold">Task Bar</h1>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    {/* Фильтр по приоритету */}
                    <Select onValueChange={(e) => setPriorityFilter(e)} value={priorityFilter}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Установите приоритет" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Приоритет</SelectLabel>
                                {priorityList.map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Фильтр по категории */}
                    <Select onValueChange={(e) => setCategoryFilter(e)} value={categoryFilter}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Установите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Категория</SelectLabel>
                                {categoryList.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Фильтр по статусу */}
                    <Select onValueChange={(e) => setStatusFilter(e)} value={statusFilter}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Установите статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Статус</SelectLabel>
                                {statusList.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={resetFilters}
                        className="hover:cursor-pointer box-border border-2 border-chart-2"
                        variant={'outline'}
                    >
                        Сбросить фильтры
                    </Button>

                    <Button className="hover:cursor-pointer" variant={'default'}>
                        <Link to={`task/${generateTaskName().number}`}>Создать задачу</Link>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full flex-1 bg-neutral-200 border-2 border-neutral-500 rounded-2xl p-2 sm:p-4">
                <h1 className="text-base sm:text-xl font-semibold mb-2">Task List</h1>
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
