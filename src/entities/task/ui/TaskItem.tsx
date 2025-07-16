import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../shared/ui/card'
import { Button } from '../../../shared/ui/button'
import TaskCategory from './TaskCategory'
import TaskStatus from './TaskStatus'
import TaskPriority from './TaskPriority'
import type { TContext } from '@/shared/types/types'
import { Link } from 'react-router-dom'
import { getCreatedTime } from '@/shared/lib/getCreatedTime'

/**
  Карточка задачи, содержащая:
 1. Обязательный текстовый заголовок
 2. Опциональное текстовое описание
 3. Цветовые плашки
 4. Кнопка "Редактировать" открывает форму редактирования.
 */

function TaskItem({ task }: { task: TContext }) {
    return (
        <Card className="h-fit w-full max-w-xs mb-4 overflow-x-auto relative">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <CardTitle>{task.header}</CardTitle>
                    <CardTitle className="text-neutral-400">{getCreatedTime()}</CardTitle>
                </CardTitle>

                <CardDescription className="wrap-break-word overflow-auto ">
                    {task.description}
                </CardDescription>

                <CardDescription>
                    Приоритет:
                    <TaskPriority priority={task.priority} />
                </CardDescription>

                <CardDescription>
                    Категория:
                    <TaskCategory category={task.category} />
                </CardDescription>

                <CardDescription>
                    Статус:
                    <TaskStatus status={task.status} />
                </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col mt-auto justify-center">
                <Button variant="outline" className="hover:cursor-pointer w-full sm:w-auto">
                    <Link to={`/task/${task.id}/edit`}> Редактировать </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default TaskItem
