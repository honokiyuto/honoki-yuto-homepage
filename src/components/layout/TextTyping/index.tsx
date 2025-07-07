import { useEffect, useRef, useState } from 'react';

type Props = {
  children: string;
  isGradient?: boolean;
};

export const TextTyping = ({ children, isGradient = false }: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let currentLength = 0;
            const interval = setInterval(() => {
              if (currentLength <= children.length) {
                setDisplayedText(children.slice(0, currentLength));
                currentLength++;
              } else {
                clearInterval(interval);
              }
            }, 100);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [children]);

  return (
    <h2
      ref={elementRef}
      className={`text-4xl/relaxed tracking-wider uppercase after:content-['|'] after:animate-typing after:p-2 ${
        isGradient
          ? 'bg-gradient-to-r from-indigo-600 via-fuchsia-400 to-amber-200 bg-clip-text text-transparent'
          : ''
      }`}
    >
      {displayedText}
    </h2>
  );
};
