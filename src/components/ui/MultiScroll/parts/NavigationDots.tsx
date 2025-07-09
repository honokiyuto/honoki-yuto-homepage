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
        className={`w-2 h-2 rounded-full ${
          activeIndex === index
            ? 'bg-white'
            : 'bg-transparent border border-white'
        }`}
        aria-label={`Go to section ${index + 1}`}
      />
    ))}
  </div>
);
