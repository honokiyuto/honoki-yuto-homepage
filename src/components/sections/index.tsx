import { LinkList } from '../ui/LinkList';
import type { Links } from '../ui/LinkList/types';
import type { Section } from '../ui/MultiScroll/types';
import { ImageCommon } from './ImageCommon';
import { SectionCommon } from './SectionCommon';
import { TopLeft, TopRight } from './Top';

const LINKS = {
  GITHUB: {
    label: 'GitHub',
    href: 'https://github.com/honokiyuto',
  },
  QIITA: {
    label: 'Qiita',
    href: 'https://qiita.com/dachscafe',
  },
  ZENN: {
    label: 'Zenn',
    href: 'https://zenn.dev/dachscafe',
  },
  SKEB: {
    label: 'Skeb',
    href: 'https://skeb.jp/@cafe_dachscafe',
  },
  X: {
    label: 'X',
    href: 'https://x.com/cafe_dachscafe',
  },
} as const satisfies Record<string, Links>;

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
        description="honokiyutoと申します。ペンネームは「Cafe」です。このホームページは私の趣味を発信する場として、今後の活動の出発点としたいと考えています。「エンジニアとしての私」、「絵師としての私」、「公認心理師としての私」の3つを通じて、自分を表現していけたらと思っています。"
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
            label: LINKS.GITHUB.label,
            href: LINKS.GITHUB.href,
          },
          {
            label: LINKS.QIITA.label,
            href: LINKS.QIITA.href,
          },
          {
            label: LINKS.ZENN.label,
            href: LINKS.ZENN.href,
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
            label: LINKS.SKEB.label,
            href: LINKS.SKEB.href,
          },
          {
            label: LINKS.X.label,
            href: LINKS.X.href,
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
  {
    anchorLinkName: 'links',
    left: <SectionCommon title="links" />,
    right: <LinkList links={Object.values(LINKS)} />,
  },
];
