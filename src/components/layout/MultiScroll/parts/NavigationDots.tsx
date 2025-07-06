type Props = {
  count: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const NavigationDots = ({
  count,
  activeIndex,
  setActiveIndex,
}: Props) => (
  <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveIndex(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          activeIndex === index ? 'bg-white scale-125' : 'bg-white/50'
        }`}
        aria-label={`Go to section ${index + 1}`}
      />
    ))}
  </div>
);
