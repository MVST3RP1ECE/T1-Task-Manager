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
import generateTaskName, { getRandomLetterRecursive } from '@/utils/generateTaskName';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';

function TaskDetails() {
    const { id } = useParams();
    const letter = getRandomLetterRecursive();
    const { state, dispatch } = useContext(Context);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            'id': `${id}`,
            'header': '',
            'description': '',
            'priority': '',
            'category': '',
            'status': '',
        }
    });

    // Задал значение header вручную
    useEffect(() => {
        setValue('header', `${letter}-${id}`);
    }, []);

    const onSubmit = (data: any) => {
        console.log('Form submitted:', data);
        return dispatch({ type: "ADD_TASK", payload: data });
        // ctx.push(data);
    };

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-center bg-neutral-300 overflow-auto">
            <Dialog>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTrigger asChild>
                        <Button className='hover:cursor-pointer' variant="outline">Создать задачу</Button>
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
                                            disabled
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
                                <Link to={"/"}>Сохранить</Link>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
            <div>TaskDetails #{id}</div>
        </section>
    );
}

export default TaskDetails;
