import type { ReactNode } from 'react';

type Props = {
  components: ReactNode[];
  activeIndex: number;
  isLeft: boolean;
  sectionNames: string[];
};

export const ScrollPanelWideScreen = ({
  components,
  activeIndex,
  isLeft,
  sectionNames,
}: Props) => {
  return (
    <div className="w-1/2 h-full relative overflow-hidden">
      {components.map((component, index) => {
        // PC表示では、左右で逆方向にスクロール
        const yOffset = isLeft
          ? (index - activeIndex) * 100
          : (activeIndex - index) * 100;

        return (
          <div
            key={index}
            id={sectionNames[index]}
            className={`absolute w-full h-full transition-transform duration-500 ease-[cubic-bezier(.94,.09,.89,.5)]`}
            style={{
              transform: `translateY(${yOffset}%)`,
            }}
          >
            {component}
          </div>
        );
      })}
    </div>
  );
};
