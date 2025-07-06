import { useState, useEffect, useMemo, useCallback } from 'react';
import { useIsMobile } from './hooks/useIsMobile';
import type { Section } from './constants';
import { NavigationDots } from './parts/NavigationDots';
import { ScrollPanelWideScreen } from './parts/ScrollPanelWideScreen';
import { ScrollPanelNarrowScreen } from './parts/ScrollPanelNarrowScreen';

// 各セクションのコンテンツを定義
// 左側のパネルのコンテンツ
const leftSections: Section[] = [
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
const rightSections: Section[] = [
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

export const MultiScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { isMobile } = useIsMobile();

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
          <ScrollPanelNarrowScreen
            upperSections={leftSections}
            lowerSections={rightSections}
            sectionCount={sectionCount}
            activeIndex={activeIndex}
          />
        ) : (
          // PC表示: 左右分割で逆方向にスクロール
          <div className="flex h-full w-full">
            <ScrollPanelWideScreen
              sections={leftSections}
              activeIndex={activeIndex}
              isLeft={true}
            />
            <ScrollPanelWideScreen
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
