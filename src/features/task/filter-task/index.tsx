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
    } = useFilterStore();
    const statusList: Array<TStatus> = ['To Do', 'In Progress', 'Done']
    const categoryList: Array<TCategory> = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']
    const priorityList: Array<TPriority> = ['Low', 'Medium', 'High']

    return (
        <>
            {/* Фильтр по приоритету */}
            <Select onValueChange={(e) => setPriority(e)} value={priority}>
                <SelectTrigger className="w-[200px] bg-white">
                    <SelectValue placeholder="Установите приоритет" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Приоритет</SelectLabel>
                        {priorityList.map((priority) => (
                            <>
                                <SelectItem key={priority} value={priority}>
                                    {priority}
                                </SelectItem>
                            </>
                        ))}

                    </SelectGroup>
                </SelectContent>
                {priority && (
                    <Button onClick={resetPriority} className="text-red-500 bg-transparent 
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
                <SelectTrigger className="w-[200px] bg-white">
                    <SelectValue placeholder="Установите категорию" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Категория</SelectLabel>
                        {categoryList.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                {category && (
                    <Button onClick={resetCategory} className="text-red-500 bg-transparent 
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
                <SelectTrigger className="w-[200px] bg-white">
                    <SelectValue placeholder="Установите статус" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Статус</SelectLabel>
                        {statusList.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                {status && (
                    <Button onClick={resetStatus} className="text-red-500 bg-transparent 
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
                className="hover:cursor-pointer box-border border-2 border-chart-2"
                variant={'outline'}
            >
                Сбросить фильтры
            </Button>
        </>
    )
}

export default FilterTask;