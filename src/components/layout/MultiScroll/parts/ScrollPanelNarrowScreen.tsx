import type { Section } from '../constants';

type Props = {
  upperSections: Section[];
  lowerSections: Section[];
  sectionCount: number;
  activeIndex: number;
};

export const ScrollPanelNarrowScreen = ({
  upperSections,
  lowerSections,
  sectionCount,
  activeIndex,
}: Props) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {Array.from({ length: sectionCount }).map((_, index) => (
        <div
          key={index}
          className="absolute w-full h-full transition-transform duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)]"
          style={{
            transform: `translateY(${(index - activeIndex) * 100}%)`,
          }}
        >
          <div className="flex flex-col h-full w-full">
            {/* 上半分: 右セクション */}
            <div
              className={`w-full h-1/2 flex items-center justify-center text-white text-center p-8 ${upperSections[index]?.bgColor || 'bg-gray-700'}`}
            >
              {upperSections[index] && (
                <div
                  className="transform transition-all duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)]"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    transform: `translateY(${index === activeIndex ? '0' : '20px'})`,
                  }}
                >
                  <h2 className="text-4xl font-bold mb-4">
                    {upperSections[index].title}
                  </h2>
                  <p className="text-lg">{upperSections[index].content}</p>
                </div>
              )}
            </div>
            {/* 下半分: 左セクション */}
            <div
              className={`w-full h-1/2 flex items-center justify-center text-white text-center p-8 ${lowerSections[index]?.bgColor || 'bg-gray-700'}`}
            >
              {lowerSections[index] && (
                <div
                  className="transform transition-all duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)]"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    transform: `translateY(${index === activeIndex ? '0' : '20px'})`,
                  }}
                >
                  <h2 className="text-4xl font-bold mb-4">
                    {lowerSections[index].title}
                  </h2>
                  <p className="text-lg">{lowerSections[index].content}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
