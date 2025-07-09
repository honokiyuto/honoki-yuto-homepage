import type { Links } from './types';

type Props = {
  links: Links[];
};

export const LinkList = ({ links }: Props) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-fuchsia-400 to-amber-200">
      <ul className="w-1/3 flex flex-col gap-5 items-center md:items-start">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-xl text-shadow-lg font-light tracking-widest uppercase hover:opacity-50 transition-opacity duration-300 ease-in-out"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
