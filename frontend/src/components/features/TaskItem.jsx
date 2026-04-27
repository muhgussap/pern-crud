import Button from '../ui/Button';

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li
            className={`border-neo-black shadow-neo mb-4 flex flex-col items-start justify-between rounded-xl border-3 p-4 transition-all sm:flex-row sm:items-center ${task.isCompleted ? 'border-neo-black/50 shadow-neo-black/50 bg-neo-grey/20 text-neo-black/50' : 'bg-neo-white text-neo-black'}`}>
            {/* Checkbox & Teks */}
            <div className="flex w-full items-start gap-4 sm:w-auto">
                {/* Checkbox */}
                <label className="relative mt-2 flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => onToggle(task)}
                        className="peer border-neo-black checked:bg-neo-orange checked:border-neo-black h-6 w-6 cursor-pointer appearance-none rounded border-2 shadow transition-all hover:shadow-md"
                    />
                    <span className="text-neo-black pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5.5 w-5.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1">
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>

                {/* Teks */}
                <div className="flex flex-col">
                    <h4 className={`text-p-lead block font-semibold ${task.isCompleted ? '' : ''}`}>
                        {task.title}
                    </h4>
                    {task.description && (
                        <p
                            className={`text-p-base text-neo-black/70 line-clamp-1 ${task.isCompleted ? 'text-neo-grey/50' : ''}`}>
                            {task.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 ml-4 flex w-full justify-end gap-3 sm:mt-0 sm:w-auto">
                {task.isCompleted ? (
                    <Button disabled variant="secondary" className="h-9 px-3 text-sm">
                        Edit
                    </Button>
                ) : (
                    <Button
                        to={`/edit/${task.id}`}
                        variant="secondary"
                        className="h-9 px-3 text-sm">
                        Edit
                    </Button>
                )}
                <Button
                    onClick={() => onDelete(task.id)}
                    disabled={task.isCompleted}
                    variant="danger"
                    className="h-9 px-3 text-sm">
                    Hapus
                </Button>
            </div>
        </li>
    );
}
