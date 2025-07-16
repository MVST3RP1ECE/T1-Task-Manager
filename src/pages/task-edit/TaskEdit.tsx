import { Button } from '@/shared/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog'
import { Label } from '@/shared/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import { useNavigate, useParams } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { schema, type TFormSchema } from '../../shared/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from '@/app/store'

function TaskEdit() {
    const { id } = useParams()
    // const { state, dispatch } = useContext(Context)
    const taskToEdit = useStore((state) => state.tasks.find((task) => task.id === id))
    const updateTask = useStore((state) => state.updateTask)
    const deleteTask = useStore((state) => state.deleteTask)
    const navigate = useNavigate()

    // type narrowing. Чтобы избежать ошибок, в defaultValues
    if (
        taskToEdit?.priority === undefined ||
        taskToEdit?.category === undefined ||
        taskToEdit?.status === undefined
    ) {
        return null
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: `${taskToEdit?.id}`,
            header: `${taskToEdit?.header}`,
            description: `${taskToEdit?.description}`,
            priority: `${taskToEdit?.priority}`,
            category: `${taskToEdit?.category}`,
            status: `${taskToEdit?.status}`,
        },
    })

    // Удаление задачи
    function handleDeleteTask() {
        if (taskToEdit?.id !== undefined) {
            deleteTask(taskToEdit.id)
        }
    }

    // Подтверждение формы
    const onSubmit = (data: any) => {
        updateTask(taskToEdit.id, data)
        return navigate('/')
    }

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-center bg-neutral-300 overflow-auto">
            <Dialog>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                // onClick={handleDeleteTask}
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
                    <DialogTrigger asChild>
                        <Button className="hover:cursor-pointer" variant="outline">
                            Обновить задачу
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Обновление задачи</DialogTitle>
                            <DialogDescription>
                                Тут можно внести изменения в задачу
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                {/* Название задачи */}
                                <Label htmlFor="header">Название задачи</Label>
                                <Controller
                                    name="header"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            id="header"
                                            maxLength={25}
                                        // disabled
                                        />
                                    )}
                                />

                                {/* Описание задачи */}
                                <Label htmlFor="description">Описание задачи</Label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            placeholder="Введите описание задачи"
                                            id="description"
                                            maxLength={250}
                                        />
                                    )}
                                />
                                {errors.description && (
                                    <p className="text-red-500">{errors.description.message}</p>
                                )}

                                {/* Приоритет задачи */}
                                <Label>Приоритет задачи</Label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Установите приоритет" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Приоритет</SelectLabel>
                                                    <SelectItem value="Low">🟢 Low</SelectItem>
                                                    <SelectItem value="Medium">
                                                        🟡 Medium
                                                    </SelectItem>
                                                    <SelectItem value="High">🔴 High</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {/* Категория задачи */}
                                <Label>Категория задачи</Label>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Выберите категорию" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Категория</SelectLabel>
                                                    <SelectItem value="Bug">🐛 Bug</SelectItem>
                                                    <SelectItem value="Feature">
                                                        ✨ Feature
                                                    </SelectItem>
                                                    <SelectItem value="Documentation">
                                                        📚 Documentation
                                                    </SelectItem>
                                                    <SelectItem value="Refactor">
                                                        ♻️ Refactor
                                                    </SelectItem>
                                                    <SelectItem value="Test">🛠️ Test</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {/* Статус задачи */}
                                <Label>Статус задачи</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Установите статус" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Статус</SelectLabel>
                                                    <SelectItem value="To Do">📋 To Do</SelectItem>
                                                    <SelectItem value="In Progress">
                                                        🔄 In Progress
                                                    </SelectItem>
                                                    <SelectItem value="Done">✔️ Done</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="hover:cursor-pointer" variant="outline">
                                    Отменить
                                </Button>
                            </DialogClose>
                            <Button
                                className="hover:cursor-pointer"
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {/* <Link to={"/"}>Сохранить</Link> */} Сохранить
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog >
            <div>TaskDetails #{id}</div>
        </section >
    )
}

export default TaskEdit
