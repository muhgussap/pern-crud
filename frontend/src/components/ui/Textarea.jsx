export default function Textarea({ label, id, error, ...props }) {
    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={id} className="text-p-base text-neo-black block font-semibold">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={`border-neo-black bg-neo-white text-neo-black text-p-base placeholder:text-neo-grey/70 placeholder:text-p-base focus:shadow-neo-black/50 disabled:border-neo-grey/70 disabled:bg-neo-grey/20 min-h-30 w-full resize-y rounded-lg border-2 px-3 py-1.5 font-normal transition-all placeholder:font-medium focus:shadow-sm focus:outline-none ${error ? 'border-neo-red' : 'border-neo-black'} `}
                {...props}
            />
            {error && <p className="text-p-sm text-neo-red font-medium">{error}</p>}
        </div>
    );
}
