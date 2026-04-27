export default function Textarea({ label, id, error, ...props}) {
    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={id} className="block text-p-base font-semibold text-neo-black">
                    {label}
                </label>
            )}
            <textarea 
                id={id}
                className={`
                    w-full px-3 py-1.5 border-2 border-neo-black rounded-lg bg-neo-white text-neo-black text-p-base font-normal transition-all min-h-30 resize-y placeholder:text-neo-grey/70 placeholder:text-p-base placeholder:font-medium focus:outline-none focus:shadow-sm focus:shadow-neo-black/50 disabled:border-neo-grey/70
                    disabled:bg-neo-grey/20
                    ${error ? 'border-neo-red' : 'border-neo-black'}
                `}
                {...props}
            />
            {error && (
                <p className="text-p-sm font-medium text-neo-red">{error}</p>
            )}
        </div>
    );
}