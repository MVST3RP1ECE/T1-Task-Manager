import type { TCategory, TPriority, TStatus } from '@/shared/types/types'
import { Button } from '@/shared/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select'
import { useFilterStore } from '@/app/stores/useFilterStore'
import { X } from "lucide-react";
import { useState, useEffect } from 'react'
import { Input } from '@/shared/ui/input';


function FilterTask() {
    const {
        status,
        category,
        priority,
        setStatus,
        setCategory,
        setPriority,
        resetStatus,
        resetCategory,
        resetPriority,
        resetFilters,
        setDebouncedSearch,
    } = useFilterStore();
    const statusList: Array<TStatus> = ['To Do', 'In Progress', 'Done']
    const categoryList: Array<TCategory> = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']
    const priorityList: Array<TPriority> = ['Low', 'Medium', 'High']
    const [search, setSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(handler);
    }, [search, setDebouncedSearch]);

    return (
        <div
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:w-full flex-wrap overflow-x-auto max-w-full"
            style={{ boxSizing: 'border-box' }}
        >
            {/* Поиск по имени */}
            <Input
                type="text"
                placeholder="Поиск по имени задачи"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded-sm px-2 py-1 text-sm min-w-[120px] max-w-[220px] w-full sm:w-auto flex-shrink-0"
                style={{ boxSizing: 'border-box' }}
            />
            {/* Фильтр по приоритету */}
            <Select onValueChange={(e) => setPriority(e)} value={priority}>
                <SelectTrigger className="w-full min-w-[110px] max-w-[160px] flex-shrink-0" style={{ boxSizing: 'border-box' }}>
                    <SelectValue placeholder="Приоритет" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Приоритет</SelectLabel>
                        {priorityList.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                {priority && (
                    <Button onClick={() => resetPriority(priority)} className="text-red-500 bg-transparent 
                    border-2
                    border-chart-2
                    hover:bg-transparent
                    hover:cursor-pointer">
                        <X size={16} className='bg-transparent' />
                    </Button>
                )}
            </Select>

            {/* Фильтр по категории */}
            <Select onValueChange={(e) => setCategory(e)} value={category}>
                <SelectTrigger className="w-full min-w-[110px] max-w-[160px] flex-shrink-0" style={{ boxSizing: 'border-box' }}>
                    <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Категория</SelectLabel>
                        {categoryList.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                {category && (
                    <Button onClick={() => resetCategory(category)} className="text-red-500 bg-transparent 
                    border-2
                    border-chart-2
                    hover:bg-transparent
                    hover:cursor-pointer">
                        <X size={16} className='bg-transparent' />
                    </Button>
                )}
            </Select>

            {/* Фильтр по статусу */}
            <Select onValueChange={(e) => setStatus(e)} value={status}>
                <SelectTrigger className="w-full min-w-[110px] max-w-[160px] flex-shrink-0" style={{ boxSizing: 'border-box' }}>
                    <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Статус</SelectLabel>
                        {statusList.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                {status && (
                    <Button onClick={() => resetStatus(status)} className="text-red-500 bg-transparent 
                    border-2
                    border-chart-2
                    hover:bg-transparent
                    hover:cursor-pointer">
                        <X size={16} className='bg-transparent' />
                    </Button>
                )}
            </Select>

            <Button
                onClick={resetFilters}
                className="hover:cursor-pointer box-border border-2 border-chart-2 flex-shrink-0 min-w-[110px] max-w-[160px]"
                variant={'outline'}
                style={{ boxSizing: 'border-box' }}
            >
                Сбросить фильтры
            </Button>
        </div>
    )
}

export default FilterTask;