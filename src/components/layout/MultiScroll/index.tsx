import { useState, useEffect, useMemo, useCallback } from 'react';
import { useIsMobile } from './hooks/useIsMobile';
import { NavigationDots } from './parts/NavigationDots';
import { ScrollPanelWideScreen } from './parts/ScrollPanelWideScreen';
import { ScrollPanelNarrowScreen } from './parts/ScrollPanelNarrowScreen';
import { sections } from '@/components/sections';
import { useUrlHash } from './hooks/useUrlHash';

export const MultiScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { isMobile } = useIsMobile();

  const sectionCount = useMemo(() => sections.length, [sections]);

  const sectionNames = useMemo(
    () => sections.map((section) => section.anchorLinkName),
    [sections]
  );

  const leftComponents = useMemo(
    () => sections.map((section) => section.left),
    [sections]
  );

  const rightComponents = useMemo(
    () => sections.map((section) => section.right),
    [sections]
  );

  useUrlHash({
    sectionNames,
    activeIndex,
    setActiveIndex,
  });

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
    <>
      <div className="h-full w-full">
        {isMobile ? (
          // スマホ表示: 1つのページとして上下にコンテンツを配置し、ページ全体をスクロール
          <ScrollPanelNarrowScreen
            upperComponents={rightComponents}
            lowerComponents={leftComponents}
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
      </div>
      <NavigationDots
        count={sectionCount}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
};
