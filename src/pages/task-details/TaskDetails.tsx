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
import { getRandomLetterRecursive } from '@/shared/lib/generateTaskName'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, type TFormSchema } from '../../shared/lib/zod'
import { useStore } from '@/app/store'
import { getCreatedTime } from '@/shared/lib/getCreatedTime'

function TaskDetails() {
    const { id } = useParams()
    const letter = getRandomLetterRecursive()
    const navigate = useNavigate()
    const addTask = useStore((state) => state.addTask)
    const createdAtRef = useRef<string | undefined>(getCreatedTime());
    console.log('createdAtRef', createdAtRef.current)

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<TFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: `${id}`,
            header: '',
            description: '',
            priority: 'Low',
            category: 'Bug',
            status: 'To Do',
            createdAt: `${localStorage.getItem('createdAt') || createdAtRef.current}`,
        },
    })

    // Задал значение header вручную
    useEffect(() => {
        setValue('header', `${letter}-${id}`)
    }, [])

    const onSubmit: SubmitHandler<TFormSchema> = (data) => {
        data.createdAt = createdAtRef.current;
        addTask(data);
        return navigate('/');
    }

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-center bg-neutral-300 overflow-auto">
            <Dialog>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTrigger asChild>
                        <Button className="hover:cursor-pointer" variant="outline">
                            Создать задачу
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Создание задачи</DialogTitle>
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
                                            minLength={5}
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
                                {errors.priority && (
                                    <p className="text-red-500">{errors.priority.message}</p>
                                )}

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
                                {errors.category && (
                                    <p className="text-red-500">{errors.category.message}</p>
                                )}

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
                                {errors.status && (
                                    <p className="text-red-500">{errors.status.message}</p>
                                )}
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
            </Dialog>
            <div>TaskDetails #{id}</div>
        </section>
    )
}

export default TaskDetails
