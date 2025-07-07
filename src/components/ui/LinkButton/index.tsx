import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  disabled?: boolean;
};

export const LinkButton = ({ href, children, disabled = false }: Props) => {
  return (
    <a
      href={disabled ? undefined : href}
      className={`border-1 border-white p-4 align-middle text-sm font-light tracking-widest uppercase hover:bg-white/20 transition-all duration-300 ease-in-out ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      }`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
    </a>
  );
};