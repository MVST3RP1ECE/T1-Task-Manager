import { Context } from '@/App';
import React, { useContext } from 'react'
import TaskItem from './TaskItem';

/** 
Отображает список задач в виде адаптивной сетки карточек (Grid или Flexbox).
Каждая задача отображается через компонент TaskItem
*/

function TaskList() {

    const ctx = useContext(Context);
    // console.log(ctx); // работает

    return (
        <div className="h-screen w-screen flex flex-col box-border items-center justify-end bg-neutral-200 overflow-auto">
            <section className='flex w-full h-4/5 bg-neutral-200 border-2 border-neutral-500 rounded-2xl'>
                <h1>Task List</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-4'>
                    {/* Здесь будут отображаться задачи */}
                    <TaskItem />
                    {/* <TaskItem /> */}

                </div>
            </section>
        </div>
    )
}

export default TaskList