import Link from 'next/link';

interface CategoryBadgeProps {
  name: string;
  href?: string;
  variant?: 'default' | 'large';
  dark?: boolean;
}

export default function CategoryBadge({ name, href, variant = 'default', dark = false }: CategoryBadgeProps) {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-colors";
  const sizeClasses = variant === 'large' 
    ? "px-4 py-2 text-sm" 
    : "px-3 py-1 text-xs";
  const colorClasses = dark 
    ? "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30" 
    : "bg-blue-100 text-blue-800 hover:bg-blue-200";

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${sizeClasses} ${colorClasses}`}>
        {name}
      </Link>
    );
  }

  return (
    <span className={`${baseClasses} ${sizeClasses} ${colorClasses}`}>
      {name}
    </span>
  );
}

