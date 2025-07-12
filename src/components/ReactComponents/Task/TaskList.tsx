
import React, { useContext, useEffect, useReducer } from 'react'
import TaskItem from './TaskItem';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Context } from '@/App';
import type { TAction, TContext, TContextArray, TContextType, TState } from '@/types';
import generateTaskName from '@/utils/generateTaskName';
import TaskDetails from '@/routes/task/TaskDetails';

/** 
Отображает список задач в виде адаптивной сетки карточек (Grid или Flexbox).
Каждая задача отображается через компонент TaskItem
*/

function TaskList() {

    const { state, dispatch } = useContext<TContextType>(Context);
    console.log(state); // работает

    useEffect(() => {
        console.log("Контекст изменился", state);

    }, [state, dispatch]);

    function createNewTask() {

    }

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-end bg-neutral-200 overflow-auto">
            <div className='flex w-full h-1/5 bg-neutral-200'>
                <h1>Task Bar</h1>
                <div>
                    <Button onClick={createNewTask} className='hover:cursor-pointer' variant={'outline'}>
                        <Link to={`task/${generateTaskName().number}`}>
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
                    {state.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}

                </div>
            </div>
        </section>
    )
}

export default TaskList