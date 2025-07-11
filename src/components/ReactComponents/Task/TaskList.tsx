
import React, { useContext, useReducer } from 'react'
import TaskItem from './TaskItem';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Context } from '@/App';
import type { TContext, TContextArray } from '@/types';

/** 
Отображает список задач в виде адаптивной сетки карточек (Grid или Flexbox).
Каждая задача отображается через компонент TaskItem
*/

function TaskList() {

    const ctx = useContext<TContextArray>(Context);
    console.log(ctx); // работает

    function createNewTask() {

    }

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-end bg-neutral-200 overflow-auto">
            <div className='flex w-full h-1/5 bg-neutral-200'>
                <h1>Task Bar</h1>
                <div>
                    <Button onClick={createNewTask} className='hover:cursor-pointer' variant={'outline'}>
                        <Link to={`task/${Date.now()}_${Math.random()}`}>
                            Create New Task
                        </Link>
                    </Button>
                </div>
            </div>
            <div className='flex w-full h-4/5 bg-neutral-200 border-2 border-neutral-500 rounded-2xl'>
                <h1>Task List</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-4'>
                    {/* Здесь будут отображаться задачи */}
                    {/* <TaskItem /> */}
                    {ctx.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}

                </div>
            </div>
        </section>
    )
}

export default TaskList