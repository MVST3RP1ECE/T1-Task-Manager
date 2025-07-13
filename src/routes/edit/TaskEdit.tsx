import { Context } from '@/App';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectGroup, SelectItem,
    SelectLabel, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
import { schema, type TFormSchema } from "../../utils/zod"
import { zodResolver } from '@hookform/resolvers/zod';


function TaskEdit() {
    const { id } = useParams();
    const { state, dispatch } = useContext(Context);
    const taskToEdit = state.find(task => task.id === id)
    const navigate = useNavigate();

    console.log("EditedTask", taskToEdit);

    // type narrowing. Чтобы избежать ошибок, в defaultValues
    if (taskToEdit?.priority === undefined || taskToEdit?.category === undefined || taskToEdit?.status === undefined) {
        return null
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<TFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            'id': `${taskToEdit?.id}`,
            'header': `${taskToEdit?.header}`,
            'description': `${taskToEdit?.description}`,
            'priority': `${taskToEdit?.priority}`,
            'category': `${taskToEdit?.category}`,
            'status': `${taskToEdit?.status}`,
        }
    });

    // Удаление задачи
    function handleDeleteTask() {
        dispatch({ type: 'REMOVE_TASK', payload: taskToEdit?.id });
        console.log("Removed");

    }

    // Подтверждение формы
    const onSubmit = (data: any) => {
        console.log('Form submitted:', data);
        dispatch({ type: "UPDATE_TASK", payload: data });
        return navigate("/");
    };

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-center bg-neutral-300 overflow-auto">
            <Dialog>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Button
                        onClick={handleDeleteTask}
                        className='mr-4 hover:cursor-pointer'
                        variant="destructive">
                        <Link to={"/"}>Удалить задачу</Link>
                    </Button>
                    <DialogTrigger asChild>
                        <Button
                            className='hover:cursor-pointer'
                            variant="outline">Обновить задачу</Button>
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
                                <Label htmlFor='header'>Название задачи</Label>
                                <Controller
                                    name="header"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            id='header'
                                            maxLength={25}
                                        // disabled
                                        />
                                    )}
                                />

                                {/* Описание задачи */}
                                <Label htmlFor='description'>Описание задачи</Label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            placeholder='Введите описание задачи'
                                            id='description'
                                            maxLength={250}
                                        />
                                    )}
                                />
                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

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
                                                    <SelectItem value="Medium">🟡 Medium</SelectItem>
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
                                                    <SelectItem value="Feature">✨ Feature</SelectItem>
                                                    <SelectItem value="Documentation">📚 Documentation</SelectItem>
                                                    <SelectItem value="Refactor">♻️ Refactor</SelectItem>
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
                                                    <SelectItem value="In Progress">🔄 In Progress</SelectItem>
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
                                <Button className='hover:cursor-pointer' variant="outline">Отменить</Button>
                            </DialogClose>
                            <Button className='hover:cursor-pointer' type="submit" onClick={handleSubmit(onSubmit)}>
                                {/* <Link to={"/"}>Сохранить</Link> */} Сохранить
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
            <div>TaskDetails #{id}</div>
        </section>
    );
}

export default TaskEdit