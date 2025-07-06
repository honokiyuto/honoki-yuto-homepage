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
    right: <div className="bg-blue-500 h-full flex items-center justify-center">Section A(right)</div>,
  },
  {
    anchorLinkName: 'section-b', 
    left: <div className="bg-green-500 h-full flex items-center justify-center">Section B(left)</div>,
    right: <div className="bg-yellow-500 h-full flex items-center justify-center">Section B(right)</div>,
  },
  {
    anchorLinkName: 'section-c',
    left: <div className="bg-purple-500 h-full flex items-center justify-center">Section C(left)</div>,
    right: <div className="bg-pink-500 h-full flex items-center justify-center">Section C(right)</div>,
  },
  {
    anchorLinkName: 'section-d',
    left: <div className="bg-indigo-500 h-full flex items-center justify-center">Section D(left)</div>,
    right: <div className="bg-cyan-500 h-full flex items-center justify-center">Section D(right)</div>,
  },
  {
    anchorLinkName: 'section-e',
    left: <div className="bg-orange-500 h-full flex items-center justify-center">Section E(left)</div>,
    right: <div className="bg-teal-500 h-full flex items-center justify-center">Section E(right)</div>,
  },
];
