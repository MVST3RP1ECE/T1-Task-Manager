import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../../ui/card'
import { Button } from '../../ui/button'
import TaskCategory from './TaskCategory'
import TaskStatus from './TaskStatus'
import TaskPriority from './TaskPriority'
import type { TContext } from '@/types'

/**
  Карточка задачи, содержащая:
 1. Обязательный текстовый заголовок
 2. Опциональное текстовое описание
 3. Цветовые плашки
 4. Кнопка "Редактировать" открывает форму редактирования.
 */

function TaskItem({ task }: { task: TContext }) {
    return (
        <Card className='h-1/2 w-64 mb-4 overflow-x-auto relative'>
            <CardHeader>

                <CardTitle>{task.header}</CardTitle>

                <CardDescription>
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

            <CardFooter className='flex mt-auto justify-center'>
                <Button variant="outline" className='hover:cursor-pointer'>Редактировать</Button>
            </CardFooter>
        </Card >
    )
}

export default TaskItem