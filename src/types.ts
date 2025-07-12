
export type TPriority = 'Low' | 'Medium' | 'High';
export type TCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
export type TStatus = 'To Do' | 'In Progress' | 'Done';

export type TContextArray = Array<{
    id: string;
    header: string;
    description: string;
    priority: TPriority;
    category: TCategory;
    status: TStatus;
}>;

export type TContext = {
    id: string;
    header: string;
    description: string;
    priority: TPriority;
    category: TCategory;
    status: TStatus;
};

export type TState = TContextArray;

export type TAction =
    | { type: 'ADD_TASK'; payload: TContext }
    | { type: 'REMOVE_TASK'; payload: string }
    | { type: 'UPDATE_TASK'; payload: TContext };

export type TContextType = {
    state: TState;
    dispatch: React.Dispatch<TAction>
};