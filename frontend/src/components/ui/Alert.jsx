export default function Alert({ children, variant = 'danger', className = '' }) {
    const variants = {
        danger: 'border-neo-red bg-neo-red/10 text-neo-red shadow-neo-red',
        success: 'border-neo-green bg-neo-green/10 text-neo-green shadow-neo-green',
        info: 'border-neo-violet bg-neo-violet/10 text-neo-violet shadow-neo-violet',
    };

    return (
        <div
            className={`shadow-neo rounded-xl border-3 p-4 text-center ${variants[variant]} ${className} `}>
            <p className="text-p-lead font-bold">{children}</p>
        </div>
    );
}
