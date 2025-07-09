import type { ReactNode } from 'react';

export type Section = {
  anchorLinkName: string;
  left: ReactNode;
  right: ReactNode;
};

export type Contents = {
  title: string;
  description?: string;
  linkButtons?: {
    label: string;
    href: string;
  }[];
};
