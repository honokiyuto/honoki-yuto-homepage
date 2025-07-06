import type { Section } from '../layout/MultiScroll/constants';
import { TextTyping } from '../layout/TextTyping';

export const sections: Section[] = [
  {
    anchorLinkName: 'section-a',
    left: (
      <div className="bg-red-500 h-full flex items-center justify-center">
        <TextTyping text="Section A(left)" />
      </div>
    ),
    right: <div className="bg-blue-500 h-full">Section A(right)</div>,
  },
  {
    anchorLinkName: 'section-b',
    left: <div>Section B(left)</div>,
    right: <div>Section B(right)</div>,
  },
  {
    anchorLinkName: 'section-c',
    left: <div>Section C(left)</div>,
    right: <div>Section C(right)</div>,
  },
  {
    anchorLinkName: 'section-d',
    left: <div>Section D(left)</div>,
    right: <div>Section D(right)</div>,
  },
];
