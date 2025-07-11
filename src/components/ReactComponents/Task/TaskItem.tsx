import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../../ui/card'
import { Button } from '../../ui/button'
import TaskCategory from './TaskCategory'
import TaskStatus from './TaskStatus'
import TaskPriority from './TaskPriority'
/**
  Карточка задачи, содержащая:
 1. Обязательный текстовый заголовок
 2. Опциональное текстовое описание
 3. Цветовые плашки
 4. Кнопка "Редактировать" открывает форму редактирования.
 */

function TaskItem() {
    return (
        <Card className='h-1/2 w-64 mb-4 overflow-x-auto relative'>
            <CardHeader>

                <CardTitle>Заголовок карточки</CardTitle>

                <CardDescription>
                    Описание карточки (опционально)
                </CardDescription>

                <CardDescription>
                    Приоритет:
                    {/* <TaskPriority priority='Low' /> */}
                    {/* <TaskPriority priority='Medium' /> */}
                    <TaskPriority priority='High' />
                </CardDescription>

                <CardDescription>
                    Категория:
                    <TaskCategory category='Bug' />
                    {/* <TaskCategory category='Test' /> */}
                    {/* <TaskCategory category='Feature' /> */}
                    {/* <TaskCategory category='Documentation' /> */}
                    {/* <TaskCategory category='Refactor' /> */}
                </CardDescription>

                <CardDescription>
                    Статус:
                    {/* <TaskStatus status='To Do' /> */}
                    {/* <TaskStatus status='In Progress' /> */}
                    <TaskStatus status='Done' />
                </CardDescription>


                {/* <CardContent>Контент карточки Lore</CardContent> */}

            </CardHeader>

            <CardFooter className='flex mt-auto justify-center'>
                <Button variant="outline" className='hover:cursor-pointer'>Редактировать</Button>
            </CardFooter>
        </Card >
    )
}

export default TaskItem