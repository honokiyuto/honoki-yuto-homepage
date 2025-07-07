import { LinkButton } from '../ui/LinkButton';
import type { Section } from '../ui/MultiScroll/constants';
import { TextTyping } from '../ui/TextTyping';
import { ImageCommon } from './ImageCommon';
import { SectionCommon } from './SectionCommon';
import { TopLeft, TopRight } from './Top';

export const sections: Section[] = [
  {
    anchorLinkName: 'top',
    left: <TopLeft />,
    right: <TopRight />,
  },
  {
    anchorLinkName: 'about',
    left: (
      <SectionCommon
        title="about"
        description="「Cafe」と申します。このホームページは私の趣味を発信する場として、今後の活動の出発点としたいと考えています。「エンジニアとしての私」、「絵師としての私」、「公認心理師としての私」の3つを通じて、自分を表現していけたらと思っています。"
      />
    ),
    right: <ImageCommon src="/img/sign_img.png" alt="about" isCover={false} />,
  },
  {
    anchorLinkName: 'engineer',
    left: (
      <SectionCommon
        title="engineer"
        links={[
          {
            label: 'GitHub',
            href: 'https://github.com/honokiyuto',
          },
          {
            label: 'Qiita',
            href: 'https://qiita.com/dachscafe',
          },
        ]}
      />
    ),
    right: <ImageCommon src="/img/iphonescreen.png" alt="engineer" isTop />,
  },
  {
    anchorLinkName: 'illustrator',
    left: (
      <SectionCommon
        title="illustrator"
        links={[
          {
            label: 'Skeb',
            href: 'https://skeb.jp/@cafe_dachscafe',
          },
          {
            label: 'X',
            href: 'https://x.com/cafe_dachscafe',
          },
        ]}
      />
    ),
    right: <ImageCommon src="/img/illust.png" alt="illustrator" isTop />,
  },
  {
    anchorLinkName: 'psychologist',
    left: (
      <SectionCommon
        title="psychologist"
        links={[
          {
            label: 'coming soon...',
            href: '#',
            disabled: true,
          },
        ]}
      />
    ),
    right: (
      <div className="h-full flex items-center justify-center bg-gradient-to-bl from-indigo-400 via-orange-200 to-slate-400">
        <h2 className="text-2xl font-bold">Coming soon...</h2>
      </div>
    ),
  },
];
