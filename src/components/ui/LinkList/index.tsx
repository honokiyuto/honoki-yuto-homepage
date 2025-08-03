import type { Links } from './types';

type Props = {
  links: Links[];
};

const LinkArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="m21 3-9 9" />
      <path d="M15 3h6v6" />
    </svg>
  );
};

export const LinkList = ({ links }: Props) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-fuchsia-400 to-amber-200">
      <ul className="w-1/3 flex flex-col gap-5 items-start">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-shadow-lg font-light tracking-widest uppercase hover:opacity-50 transition-opacity duration-300 ease-in-out flex items-center gap-2"
            >
              <span className="text-sm">
                <LinkArrow />
              </span>
              <span className="ml-2">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
