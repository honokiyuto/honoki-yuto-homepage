import type { ReactNode } from 'react';

type Props = {
  upperComponents: ReactNode[];
  lowerComponents: ReactNode[];
  sectionCount: number;
  activeIndex: number;
};

export const ScrollPanelNarrowScreen = ({
  upperComponents,
  lowerComponents,
  sectionCount,
  activeIndex,
}: Props) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {Array.from({ length: sectionCount }).map((_, index) => (
        <div
          key={index}
          className="absolute w-full h-full transition-transform duration-500 ease-[cubic-bezier(.94,.09,.89,.5)]"
          style={{
            transform: `translateY(${(index - activeIndex) * 100}%)`,
          }}
        >
          <div className="flex flex-col h-full w-full">
            {/* 上半分: 右セクション */}
            <div className="h-5/9">
              {upperComponents[index] && upperComponents[index]}
            </div>
            {/* 下半分: 左セクション */}
            <div className="h-4/9">
              {lowerComponents[index] && lowerComponents[index]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
