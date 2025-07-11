
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
