import { useEffect, useState } from 'react';

type Props = {
  text: string;
};

export const TextTyping = ({ text }: Props) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, 100);

    return () => clearInterval(interval);
  }, [text, displayedText]);

  return (
    <h2 className="text-2xl font-bold font-oswald after:content-['|'] after:animate-typing after:p-2">
      {displayedText}
    </h2>
  );
};
