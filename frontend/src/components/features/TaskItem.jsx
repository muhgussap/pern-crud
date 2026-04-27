import Button from "../ui/Button";

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 mb-4 border-3 border-neo-black rounded-xl shadow-neo transition-all ${task.isCompleted ? 'border-neo-black/50 shadow-neo-black/50 bg-neo-grey/20 text-neo-black/50' : 'bg-neo-white text-neo-black'}`}>
            {/* Checkbox & Teks */}
            <div className="flex items-start gap-4 w-full sm:w-auto">
                {/* Checkbox */}
                <label className="flex mt-2 items-center cursor-pointer relative">
                    <input 
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => onToggle(task)}
                        className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-2 border-neo-black checked:bg-neo-orange checked:border-neo-black"
                    />
                    <span className="absolute text-neo-black opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>

                {/* Teks */}
                <div className="flex flex-col">
                    <h4 className={`text-p-lead font-semibold block ${task.isCompleted ? '' : ''}`}>
                        {task.title}
                    </h4>
                    {task.description && (
                        <p className={`text-p-base text-neo-black/70 line-clamp-1 ${task.isCompleted ? 'text-neo-grey/50' : ''}`}>
                            {task.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-3 ml-4 w-full sm:w-auto justify-end mt-4 sm:mt-0">
                {task.isCompleted ? (
                    <Button disabled variant="secondary" className="h-9 px-3 text-sm">
                        Edit
                    </Button>
                ) : (
                    <Button to={`/edit/${task.id}`} variant="secondary" className="h-9 px-3 text-sm">
                        Edit
                    </Button>
                )}
                <Button 
                    onClick={() => onDelete(task.id)} 
                    disabled={task.isCompleted}
                    variant="danger" 
                    className="h-9 px-3 text-sm"
                >
                    Hapus
                </Button>
            </div>
        </li>
    )
}