import type { Section } from '../layout/MultiScroll/constants';
import { TextTyping } from '../layout/TextTyping';

export const sections: Section[] = [
  {
    anchorLinkName: 'top',
    left: (
      <div className="h-full flex items-center justify-center">
        <div className="p-10 max-w-3/4">
          <TextTyping isGradient>
            Welcome to the Cafe's Entrance 2023
          </TextTyping>
        </div>
      </div>
    ),
    right: (
      <div className="bg-linear-to-br from-indigo-600 via-fuchsia-400 to-amber-200 h-full flex items-center justify-center"></div>
    ),
  },
  {
    anchorLinkName: 'about',
    left: (
      <div className="h-full flex flex-col items-center justify-center gap-5 p-10">
        <TextTyping>about</TextTyping>
        <p className="text-center">
          「Cafe」と申します。このホームページは私の趣味を発信する場として、今後の活動の出発点としたいと考えています。「エンジニアとしての私」、「絵師としての私」、「公認心理師としての私」の3つを通じて、自分を表現していけたらと思っています。
        </p>
      </div>
    ),
    right: (
      <div className="h-full flex items-center justify-center">
        <img
          src="/img/sign_img.png"
          alt="about"
          className="h-full object-contain"
        />
      </div>
    ),
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
