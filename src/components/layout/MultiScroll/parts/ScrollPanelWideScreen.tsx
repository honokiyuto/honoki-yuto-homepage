import type { Section } from '../constants';

type Props = {
  sections: Section[];
  activeIndex: number;
  isLeft: boolean;
};

export const ScrollPanelWideScreen = ({
  sections,
  activeIndex,
  isLeft,
}: Props) => {
  return (
    <div className="w-1/2 h-full relative overflow-hidden">
      {sections.map((section, index) => {
        // PC表示では、左右で逆方向にスクロール
        const yOffset = isLeft
          ? (index - activeIndex) * 100
          : (activeIndex - index) * 100;

        return (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)] ${section.bgColor}`}
            style={{
              transform: `translateY(${yOffset}%)`,
            }}
          >
            <div className="flex items-center justify-center h-full text-white text-center p-8">
              <div className="transform transition-all duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)]">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {section.title}
                </h2>
                <p className="text-lg md:text-xl">{section.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
