import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, type TFormSchema } from '@/shared/lib/zod'
import { tasksAPI } from '@/shared/fakeAPI'
import RemoveTask from '../remove-task'
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

function EditTask() {
    const { id } = useParams()
    const [taskToEdit, setTaskToEdit] = useState<TFormSchema | null>(null)
    const navigate = useNavigate()

    const { handleSubmit, control, formState: { errors }, reset } = useForm<TFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: '',
            header: '',
            description: '',
            priority: 'Low',
            category: 'Bug',
            status: 'To Do',
        },
    });

    useEffect(() => {
        if (id) {
            tasksAPI.getTaskById(id).then((task) => {
                if (task) {
                    setTaskToEdit(task);
                    reset({
                        id: task.id,
                        header: task.header,
                        description: task.description,
                        priority: task.priority,
                        category: task.category,
                        status: task.status,
                    });
                }
            });
        }
    }, [id, reset]);

    if (!taskToEdit) return <div>Загрузка...</div>;

    const onSubmit = async (data: any) => {
        await tasksAPI.updateTask(data.id, data)
        return navigate('/')
    }

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-center bg-neutral-300 overflow-auto">
            <Dialog>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Фича с удалением задачи */}
                    <RemoveTask />
                    {/* Фича с удалением задачи */}
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
                                Сохранить
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog >
            <div>Задача #{id}</div>
        </section >
    )
}

export default EditTask