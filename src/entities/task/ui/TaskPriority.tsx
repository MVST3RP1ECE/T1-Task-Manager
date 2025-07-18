/**
 * Приоритет задачи: Low, Medium, High
 * @param priority string
 */

function TaskPriority({ priority }: { priority: string }) {
    switch (priority) {
        case 'Low':
            return (
                <div className="bg-[#22C55E]/40 text-[#15803D] rounded-xl max-w-max px-1 pr-1">
                    Low
                </div>
            )
        case 'Medium':
            return (
                <div className="bg-[#EAB308]/40 text-[#92400E] rounded-xl max-w-max px-1 pr-1">
                    Medium
                </div>
            )
        case 'High':
            return (
                <div className="bg-[#DC2626]/40 text-[#991B1B] rounded-xl max-w-max px-1 pr-1">
                    High
                </div>
            )
        default:
            break
    }
}

export default TaskPriority
