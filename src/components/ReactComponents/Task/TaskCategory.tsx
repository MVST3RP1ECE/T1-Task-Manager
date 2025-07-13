/**
 *  Категории: Bug / Feature / Documentation / Refactor / Test
 * @returns 
 */

function TaskCategory({ category }: { category: string }) {
    switch (category) {
        case 'Bug':
            return <div className='bg-[#DC2626]/40 text-red-800 rounded-xl max-w-max px-1 pr-1'>🐛 Bug</div>;
        case 'Feature':
            return <div className='bg-[#9333EA]/40 text-purple-800 rounded-xl max-w-max px-1 pr-1'>✨ Feature</div>;
        case 'Documentation':
            return <div className='bg-[#3B82F6]/40 text-blue-800 rounded-xl max-w-max px-1 pr-1'>📚 Documentation</div>;
        case 'Refactor':
            return <div className='bg-[#22C55E]/40 text-green-800 rounded-xl max-w-max px-1 pr-1'>♻️ Refactor</div>;
        case 'Test':
            return <div className='bg-[#1E40AF]/40 text-blue-950 rounded-xl max-w-max px-1 pr-1'>🛠️ Test</div>;
        default:
            break;
    }
}

export default TaskCategory