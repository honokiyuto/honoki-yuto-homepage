import { LinkButton } from '@/components/ui/LinkButton';
import { TextTyping } from '@/components/ui/TextTyping';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  links?: {
    label: ReactNode;
    href: string;
    disabled?: boolean;
  }[];
};

export const SectionCommon = ({ title, description, links }: Props) => {
  return (
    <div className="h-full flex flex-col items-center md:justify-center gap-5 p-10">
      <TextTyping>{title}</TextTyping>
      {description && (
        <p className="text-center text-sm md:text-base">{description}</p>
      )}
      {links && (
        <div className="flex gap-4">
          {links.map((link) => (
            <LinkButton key={link.href} href={link.href} disabled={link.disabled}>
              {link.label}
            </LinkButton>
          ))}
        </div>
      )}
    </div>
  );
};
