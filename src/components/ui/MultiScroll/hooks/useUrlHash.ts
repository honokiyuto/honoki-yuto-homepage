import { useEffect } from 'react';

const getActiveIndexFromHash = (sectionNames: string[]) => {
  const hash = window.location.hash.slice(1); // '#' を除去
  const index = sectionNames.findIndex((name) => name === hash);
  return index >= 0 ? index : 0;
};

type Props = {
  sectionNames: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const useUrlHash = ({
  sectionNames,
  activeIndex,
  setActiveIndex,
}: Props) => {
  // activeIndexが変更されたときにURLの#を更新
  useEffect(() => {
    const currentHash = window.location.hash.slice(1);
    const currentSectionName = sectionNames[activeIndex];

    if (currentHash !== currentSectionName) {
      history.replaceState(null, '', `#${currentSectionName}`);
    }
  }, [activeIndex, sectionNames]);

  // URL更新時にactiveIndexを更新
  useEffect(() => {
    const handleHashChange = () => {
      const index = getActiveIndexFromHash(sectionNames);
      setActiveIndex(index >= 0 ? index : 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [sectionNames, setActiveIndex]);
};
