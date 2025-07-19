import { useStore } from '@/app/stores/store'
import { tasksAPI } from '@/shared/fakeAPI'
import { Button } from '@/shared/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog'
import { Link, useParams } from 'react-router-dom'

function RemoveTask() {
    const { id } = useParams()
    const taskToEdit = useStore((state) => state.tasks.find((task) => task.id === id))
    const deleteTask = useStore(state => state.deleteTask)

    // Сужение типов (Type Narrowing). Чтобы избежать ошибок, в defaultValues
    if (
        taskToEdit?.priority === undefined ||
        taskToEdit?.category === undefined ||
        taskToEdit?.status === undefined
    ) {
        return null
    }

    // Удаление задачи
    // function handleDeleteTask() {
    //     if (taskToEdit?.id !== undefined) {
    //         deleteTask(taskToEdit.id)
    //     }
    // }


    async function handleDeleteTask() {
        if (id !== undefined) {
            await tasksAPI.deleteTask(id)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="mr-4 hover:cursor-pointer"
                    variant="destructive"> Удалить задачу</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Удаление задачи</DialogTitle>
                    <DialogDescription>
                        Вы уверены что хотите удалить задачу?
                    </DialogDescription>
                    <Button
                        onClick={handleDeleteTask}
                        className="mt-8 hover:cursor-pointer"
                        variant="destructive"
                    >
                        <Link to={'/'}>Удалить задачу</Link>
                    </Button>
                    <DialogClose asChild>
                        <Button className="hover:cursor-pointer" variant="outline">
                            Отменить
                        </Button>
                    </DialogClose>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveTask