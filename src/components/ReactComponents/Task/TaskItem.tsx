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
import { useContext } from 'react'
import { Context } from '@/App'
import { Link } from 'react-router-dom'

/**
  Карточка задачи, содержащая:
 1. Обязательный текстовый заголовок
 2. Опциональное текстовое описание
 3. Цветовые плашки
 4. Кнопка "Редактировать" открывает форму редактирования.
 */

function TaskItem({ task }: { task: TContext }) {

    // const { state, dispatch } = useContext(Context);

    function handleClick() {
        console.log(task.header);

    }

    return (
        <Card className='h-fit w-full max-w-xs mb-4 overflow-x-auto relative'>
            <CardHeader>

                <CardTitle>{task.header}</CardTitle>

                <CardDescription className='wrap-break-word overflow-auto '>
                {/* <CardDescription className='break-words overflow-auto line-clamp-2'> */}
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
                <Button
                    onClick={handleClick}
                    variant="outline"
                    className='hover:cursor-pointer w-full sm:w-auto'>
                    <Link to={`/task/${task.id}/edit`}> Редактировать </Link>
                </Button>
            </CardFooter>
        </Card >
    )
}

export default TaskItem