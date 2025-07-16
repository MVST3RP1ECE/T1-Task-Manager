/**
 * Статус задачи: To Do, In Progress, Done
 * @param status string
 */
function TaskStatus({ status }: { status: string }) {
    switch (status) {
        case 'To Do':
            return (
                <div className="bg-[#6B7280]/40 text-neutral-600 rounded-xl max-w-max px-1 pr-1">
                    📋 To Do
                </div>
            )
        case 'In Progress':
            return (
                <div className="bg-[#033eff]/40 text-blue-800 rounded-xl max-w-max px-1 pr-1">
                    🔄 In Progress
                </div>
            )
        case 'Done':
            return (
                <div className="bg-[#22C55E]/40 text-green-800 rounded-xl max-w-max px-1 pr-1">
                    ✔️ Done
                </div>
            )
        default:
            break
    }
}

export default TaskStatus
