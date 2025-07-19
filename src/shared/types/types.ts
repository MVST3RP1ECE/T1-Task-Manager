export type TPriority = 'Low' | 'Medium' | 'High'
export type TCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test'
export type TStatus = 'To Do' | 'In Progress' | 'Done'

export type TContextArray = Array<TContext>

export type TContext = {
    id: string
    header: string
    description: string
    priority: TPriority
    category: TCategory
    status: TStatus

    createdAt?: string
    updatedAt?: string
}

export type FilterState = {
    status: string;
    category: string;
    priority: string;
    debouncedSearch: string;
    setDebouncedSearch: (value: string) => void;
    setStatus: (value: string) => void;
    setCategory: (value: string) => void;
    setPriority: (value: string) => void;
    resetStatus: (value: string) => void;
    resetCategory: (value: string) => void;
    resetPriority: (value: string) => void;
    resetFilters: () => void;
};

export type TaskStore = {
    tasks: TContextArray
    addTask: (task: TContext) => void
    deleteTask: (id: string) => void
    updateTask: (id: string, updatedTask: TContext) => void
}

export type TState = TContextArray

export type TAction =
    | { type: 'ADD_TASK'; payload: TContext }
    | { type: 'REMOVE_TASK'; payload: string }
    | { type: 'UPDATE_TASK'; payload: TContext }

export type TContextType = {
    state: TState
    dispatch: React.Dispatch<TAction>
}
