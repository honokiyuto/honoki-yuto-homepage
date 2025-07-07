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
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-300 ease-in-out ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        {/* 円形拡大背景 */}
        <div
          className={`absolute inset-0 ${
            isOpen ? 'backdrop-blur-sm bg-black/80' : 'opacity-0'
          }`}
          style={{
            clipPath: isOpen
              ? 'circle(150% at 2.5rem 2.5rem)'
              : 'circle(1rem at 2.5rem 2.5rem)',
            transition: 'clip-path 0.7s ease-in-out, opacity 0.7s ease-in-out',
          }}
        />

        {/* メニューコンテンツ */}
        <nav
          className={`relative z-50 transition-all duration-500 delay-200 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col items-center justify-center gap-8">
            {sections.map((section, index) => (
              <li
                key={section.anchorLinkName}
                className={`text-xl font-light tracking-wider transition-all duration-300 ${
                  isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isOpen ? `${300 + index * 100}ms` : '0ms',
                }}
              >
                <a
                  href={`#${section.anchorLinkName}`}
                  onClick={handleLinkClick}
                  className="relative text-white hover:text-gray-300 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white hover:after:w-full after:transition-[width] after:duration-300 after:ease-out uppercase"
                >
                  {section.anchorLinkName}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
