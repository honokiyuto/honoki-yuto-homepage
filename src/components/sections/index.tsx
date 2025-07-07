import type { Section } from '../ui/MultiScroll/constants';
import { TextTyping } from '../ui/TextTyping';
import { AboutLeft, AboutRight } from './About';
import { TopLeft, TopRight } from './Top';

export const sections: Section[] = [
  {
    anchorLinkName: 'top',
    left: <TopLeft />,
    right: <TopRight />,
  },
  {
    anchorLinkName: 'about',
    left: <AboutLeft />,
    right: <AboutRight />,
  },
  {
    anchorLinkName: 'section-c',
    left: (
      <div className="h-full flex items-center justify-center">
        <TextTyping>Section C</TextTyping>
      </div>
    ),
    right: (
      <div className="h-full flex items-center justify-center">
        <TextTyping>Section C(right)</TextTyping>
      </div>
    ),
  },
  {
    anchorLinkName: 'section-d',
    left: (
      <div className="h-full flex items-center justify-center">
        <TextTyping>Section D</TextTyping>
      </div>
    ),
    right: (
      <div className="bg-cyan-500 h-full flex items-center justify-center">
        <TextTyping>Section D(right)</TextTyping>
      </div>
    ),
  },
  {
    anchorLinkName: 'section-e',
    left: (
      <div className="bg-orange-500 h-full flex items-center justify-center">
        <TextTyping>Section E</TextTyping>
      </div>
    ),
    right: (
      <div className="bg-teal-500 h-full flex items-center justify-center">
        <TextTyping>Section E(right)</TextTyping>
      </div>
    ),
  },
];
