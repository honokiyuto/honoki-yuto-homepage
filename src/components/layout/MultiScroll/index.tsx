import { useState, useEffect, useMemo, useCallback } from 'react';
import { useIsMobile } from './hooks/useIsMobile';
import type { Section } from './constants';
import { NavigationDots } from './parts/NavigationDots';
import { ScrollPanelWideScreen } from './parts/ScrollPanelWideScreen';
import { ScrollPanelNarrowScreen } from './parts/ScrollPanelNarrowScreen';

const TEST_SECTIONS: Section[] = [
  {
    left: <div className="bg-red-500 h-full">Section A(left)</div>,
    right: <div className="bg-blue-500 h-full">Section A(right)</div>,
  },
  {
    left: <div>Section B(left)</div>,
    right: <div>Section B(right)</div>,
  },
  {
    left: <div>Section C(left)</div>,
    right: <div>Section C(right)</div>,
  },
  {
    left: <div>Section D(left)</div>,
    right: <div>Section D(right)</div>,
  },
];

type Props = {
  sections: Section[];
};

export const MultiScroll = ({ sections = TEST_SECTIONS }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { isMobile } = useIsMobile();

  const sectionCount = useMemo(() => sections.length, [sections]);

  const leftComponents = useMemo(
    () => sections.map((section) => section.left),
    [sections]
  );

  const rightComponents = useMemo(
    () => sections.map((section) => section.right),
    [sections]
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
            upperComponents={leftComponents}
            lowerComponents={rightComponents}
            sectionCount={sectionCount}
            activeIndex={activeIndex}
          />
        ) : (
          // PC表示: 左右分割で逆方向にスクロール
          <div className="flex h-full w-full">
            <ScrollPanelWideScreen
              components={leftComponents}
              activeIndex={activeIndex}
              isLeft={true}
            />
            <ScrollPanelWideScreen
              components={rightComponents}
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
