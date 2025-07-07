import { useState } from 'react';
import { sections } from '@/components/sections';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ハンバーガーアイコン */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex flex-col items-center justify-center w-8 h-8 p-1"
        aria-label="メニューを開く"
      >
        <span
          className={`block w-full h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`block w-full h-0.5 bg-white transition-all duration-300 mt-1 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-full h-0.5 bg-white transition-all duration-300 mt-1 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* オーバーレイとメニュー */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={toggleMenu}
        >
          {/* 背景オーバーレイ */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* メニューコンテンツ */}
          <nav
            className="relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col items-center justify-center gap-8">
              {sections.map((section) => (
                <li
                  key={section.anchorLinkName}
                  className="text-xl font-light tracking-wider"
                >
                  <a
                    href={`#${section.anchorLinkName}`}
                    onClick={handleLinkClick}
                    className="relative text-white hover:text-gray-300 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white hover:after:w-full after:transition-[width] after:duration-300 after:ease-out"
                  >
                    {section.anchorLinkName.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
