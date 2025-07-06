import { useState, useEffect, useMemo, useCallback } from 'react';
import { useIsMobile } from './hooks/useIsMobile';
import { NavigationDots } from './parts/NavigationDots';
import { ScrollPanelWideScreen } from './parts/ScrollPanelWideScreen';
import { ScrollPanelNarrowScreen } from './parts/ScrollPanelNarrowScreen';
import { sections } from '@/components/sections';

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

  // URLハッシュからactiveIndexを取得する関数
  const getActiveIndexFromHash = useCallback(() => {
    const hash = window.location.hash.slice(1); // '#' を除去
    const index = sectionNames.findIndex((name) => name === hash);
    return index >= 0 ? index : 0;
  }, [sectionNames]);

  // activeIndexが変更されたときにURLハッシュを更新
  useEffect(() => {
    const currentHash = window.location.hash.slice(1);
    const currentSectionName = sectionNames[activeIndex];

    if (currentHash !== currentSectionName) {
      // history.replaceState を使ってブラウザ履歴を汚さないようにする
      history.replaceState(null, '', `#${currentSectionName}`);
    }
  }, [activeIndex, sectionNames]);

  // 初期化時とpopstateイベント時にURLハッシュから現在のセクションを設定
  useEffect(() => {
    // 初期化時にURLハッシュから現在のセクションを設定
    const initialIndex = getActiveIndexFromHash();
    if (initialIndex !== activeIndex) {
      setActiveIndex(initialIndex);
    }

    // popstateイベント（戻る/進むボタン）を監視
    const handlePopState = () => {
      const hashIndex = getActiveIndexFromHash();
      setActiveIndex(hashIndex);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [getActiveIndexFromHash, activeIndex]);

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
              sectionNames={sectionNames}
            />
            <ScrollPanelWideScreen
              components={rightComponents}
              activeIndex={activeIndex}
              isLeft={false}
              sectionNames={sectionNames}
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
