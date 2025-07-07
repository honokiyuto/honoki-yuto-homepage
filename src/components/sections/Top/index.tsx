import { TextTyping } from '@/components/layout/TextTyping';

const ScrollDown = () => {
  return (
    <div className="absolute right-10 bottom-10 h-10 after:content-[''] after:absolute after:top-0 after:w-[1px] after:h-5 after:bg-white after:animate-[pathmove_1.4s_ease-in-out_infinite] after:opacity-0">
      <span className="absolute -left-4 -top-5 text-[0.7rem] text-xs tracking-widest uppercase">
        Scroll
      </span>
    </div>
  );
};

export const TopLeft = () => {
  return (
    <div className="h-full">
      <div className="h-full flex md:items-center items-start justify-center">
        <div className="p-10 max-w-3/4">
          <TextTyping isGradient>
            Welcome to the Cafe's Entrance 2023
          </TextTyping>
        </div>
      </div>
      <ScrollDown />
    </div>
  );
};

export const TopRight = () => {
  return (
    <div className="bg-linear-to-br from-indigo-600 via-fuchsia-400 to-amber-200 h-full items-center justify-center"></div>
  );
};
