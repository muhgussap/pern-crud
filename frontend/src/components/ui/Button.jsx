import { Link } from 'react-router';

export default function Button({
    children,
    variant = 'primary',
    to,
    className = '',
    disabled,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center h-10 px-4 text-p-base font-medium border-2 transition-all rounded-full disabled:opacity-50 disabled:pointer-events-none active:shadow-none";

    const variants = {
        primary: "border-neo-black bg-neo-green text-neo-black shadow-neo hover:bg-neo-green-hover active:translate-x-0.5 active:translate-y-0.5",
        secondary: "border-neo-black bg-neo-white text-neo-black shadow-neo hover:bg-neo-black/10 active:translate-x-0.5 active:translate-y-0.5",
        danger: "border-neo-black bg-neo-red text-neo-black shadow-neo hover:bg-neo-red-hover active:translate-x-0.5 active:translate-y-0.5",
        ghost: "border-transparent text-neo-black hover:bg-neo-black/10 active:translate-x-0 active:translate-y-0"
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button disabled={disabled} className={combinedClassName} {...props}>
            {children}
        </button>
    );
}