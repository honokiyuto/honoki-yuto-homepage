export const ScrollDown = () => {
  return (
    <div className="absolute right-10 bottom-10 h-10 after:content-[''] after:absolute after:top-0 after:w-[1px] after:h-5 after:bg-white after:animate-[pathmove_1.4s_ease-in-out_infinite] after:opacity-0">
      <span className="absolute -left-4 -top-5 text-[0.7rem] text-xs tracking-widest uppercase">
        Scroll
      </span>
    </div>
  );
};
