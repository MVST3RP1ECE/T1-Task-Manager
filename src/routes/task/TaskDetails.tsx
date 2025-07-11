import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

/**
 * Форма редактирования задачи, открывается по маршруту /task/:id.
 * 
 * Отображает полную информацию о задаче
 * 
 * Форма позволяет изменить:
 * 
 * Заголовок,
 * Описание,
 * Категорию,
 * Статус,
 * Приоритет;

 * Кнопки: "Сохранить", "Отмена". Нажатие на кнопку приводит к сохранению внесенных
 изменений и возврату к списку задач.
 */


function TaskDetails() {
    const { id } = useParams();

    function handleSubmit() {

    }

    return (
        <section className="h-screen w-screen flex flex-col box-border items-center justify-center bg-neutral-300 overflow-auto">
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline">Открыть</Button>
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

                                <Label htmlFor='task-name'>Название задачи</Label>
                                <Textarea placeholder='Введите название задачи'
                                    id='task-name'
                                    maxLength={25} />

                                <Label htmlFor='task-description'>Описание задачи</Label>
                                <Textarea placeholder='Введите описание задачи'
                                    id='task-description'
                                    maxLength={250} />

                                {/* Приоритет задачи */}
                                <Label>Приоритет задачи</Label>
                                <Select>
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

                                {/* Категория задачи */}
                                <Label>Категория задачи</Label>
                                <Select>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Выберете категорию" />
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

                                {/* Статус задачи */}
                                <Label>Статус задачи</Label>
                                <Select>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Установите cтатус" />
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

                            </div>
                            {/* <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input id="username-1" name="username" defaultValue="@peduarte" />
                            </div> */}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className='hover:cursor-pointer'
                                    variant="outline"
                                >Отменить</Button>
                            </DialogClose>

                            <Button
                                className='hover:cursor-pointer'
                                type="submit"
                                onClick={handleSubmit}
                            >
                                <Link to={'/'}>Сохранить</Link>
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