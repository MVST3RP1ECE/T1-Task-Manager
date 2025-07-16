import * as z from 'zod'

export const schema = z.object({
    id: z.string(),
    header: z.string().min(5, { error: 'Заголовок должен содержать минимум 5 символов' }).max(25),
    description: z
        .string()
        .min(5, { error: 'Описание должно содержать минимум 5 символов' })
        .max(250),
    priority: z.enum(['Low', 'Medium', 'High'], {
        error: 'Задача должна иметь приоритет',
    }),
    category: z.enum(['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'], {
        error: 'Задача должна иметь категорию',
    }),
    status: z.enum(['To Do', 'In Progress', 'Done'], {
        error: 'Задача должна иметь статус',
    }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

export type TFormSchema = z.infer<typeof schema>
