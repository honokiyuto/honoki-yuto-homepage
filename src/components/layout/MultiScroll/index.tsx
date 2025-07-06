import { useState, useEffect, useMemo, useCallback } from 'react';

// メディアクエリの状態を管理するカスタムフック
const useMediaQuery = () => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches]);

  return matches;
};

// 各セクションのコンテンツを定義
// 左側のパネルのコンテンツ
const leftSections = [
  {
    title: 'セクション 1',
    content: 'これは左側の最初のセクションです。',
    bgColor: 'bg-indigo-500',
  },
  {
    title: 'セクション 2',
    content: 'ReactとTailwind CSSを使用して実装しています。',
    bgColor: 'bg-purple-500',
  },
  {
    title: 'セクション 3',
    content: 'マウスホイールでスクロールできます。',
    bgColor: 'bg-pink-500',
  },
  {
    title: 'セクション 4',
    content: '最後のセクションです。',
    bgColor: 'bg-red-500',
  },
  {
    title: 'セクション 5',
    content: '最後のセクションです。',
    bgColor: 'bg-red-500',
  },
];

// 右側のパネルのコンテンツ
const rightSections = [
  {
    title: 'Section A',
    content: 'This is the first section on the right side.',
    bgColor: 'bg-sky-500',
  },
  {
    title: 'Section B',
    content: 'Implemented with React and Tailwind CSS.',
    bgColor: 'bg-cyan-500',
  },
  {
    title: 'Section C',
    content: 'You can scroll with the mouse wheel.',
    bgColor: 'bg-teal-500',
  },
  {
    title: 'Section D',
    content: 'This is the final section.',
    bgColor: 'bg-emerald-500',
  },
  {
    title: 'Section E',
    content: 'This is the final section.',
    bgColor: 'bg-emerald-500',
  },
];

// PC表示用のパネルを描画するコンポーネント
const ScrollPanel = ({
  sections,
  activeIndex,
  isLeft,
}: {
  sections: {
    title: string;
    content: string;
    bgColor: string;
  }[];
  activeIndex: number;
  isLeft: boolean;
}) => {
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
              <div
                className="transform transition-all duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)]"
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                  transform: `translateY(${index === activeIndex ? '0' : '20px'})`,
                }}
              >
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

// ナビゲーションドットを描画するコンポーネント
const NavigationDots = ({
  count,
  activeIndex,
  setActiveIndex,
}: {
  count: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) => (
  <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveIndex(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          activeIndex === index ? 'bg-white scale-125' : 'bg-white/50'
        }`}
        aria-label={`Go to section ${index + 1}`}
      />
    ))}
  </div>
);

export const MultiScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const isMobile = useMediaQuery();

  const sectionCount = useMemo(
    () => Math.max(leftSections.length, rightSections.length),
    []
  );

  const handleScroll = useCallback(
    (direction: 'down' | 'up') => {
      if (isScrolling) return;

      let nextIndex;
      if (direction === 'down') {
        nextIndex = (activeIndex + 1) % sectionCount;
      } else {
        // 'up'
        nextIndex = (activeIndex - 1 + sectionCount) % sectionCount;
      }

      if (nextIndex !== activeIndex) {
        setActiveIndex(nextIndex);
        setIsScrolling(true);
        setTimeout(() => {
          setIsScrolling(false);
        }, 1500);
      }
    },
    [activeIndex, isScrolling, sectionCount]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      handleScroll(event.deltaY > 0 ? 'down' : 'up');
    },
    [handleScroll]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        handleScroll('down');
      } else if (event.key === 'ArrowUp') {
        handleScroll('up');
      }
    },
    [handleScroll]
  );

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      handleScroll(diff > 0 ? 'down' : 'up');
      setTouchStart(null);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove]);

  return (
    <div className="h-screen w-screen bg-gray-800 font-sans overflow-hidden">
      <main className="h-full w-full">
        {isMobile ? (
          // スマホ表示: 1つのページとして上下にコンテンツを配置し、ページ全体をスクロール
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
                    className={`w-full h-1/2 flex items-center justify-center text-white text-center p-8 ${rightSections[index]?.bgColor || 'bg-gray-700'}`}
                  >
                    {rightSections[index] && (
                      <div
                        className="transform transition-all duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)]"
                        style={{
                          opacity: index === activeIndex ? 1 : 0,
                          transform: `translateY(${index === activeIndex ? '0' : '20px'})`,
                        }}
                      >
                        <h2 className="text-4xl font-bold mb-4">
                          {rightSections[index].title}
                        </h2>
                        <p className="text-lg">
                          {rightSections[index].content}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* 下半分: 左セクション */}
                  <div
                    className={`w-full h-1/2 flex items-center justify-center text-white text-center p-8 ${leftSections[index]?.bgColor || 'bg-gray-700'}`}
                  >
                    {leftSections[index] && (
                      <div
                        className="transform transition-all duration-1000 ease-[cubic-bezier(.94,.09,.89,.5)]"
                        style={{
                          opacity: index === activeIndex ? 1 : 0,
                          transform: `translateY(${index === activeIndex ? '0' : '20px'})`,
                        }}
                      >
                        <h2 className="text-4xl font-bold mb-4">
                          {leftSections[index].title}
                        </h2>
                        <p className="text-lg">{leftSections[index].content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // PC表示: 左右分割で逆方向にスクロール
          <div className="flex h-full w-full">
            <ScrollPanel
              sections={leftSections}
              activeIndex={activeIndex}
              isLeft={true}
            />
            <ScrollPanel
              sections={rightSections}
              activeIndex={activeIndex}
              isLeft={false}
            />
          </div>
        )}
      </main>
      <NavigationDots
        count={sectionCount}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
};
