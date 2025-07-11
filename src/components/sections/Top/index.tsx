import { TextTyping } from '@/components/ui/TextTyping';
import Orb from '@/components/ui/Orb/Orb';
import { ScrollDown } from '@/components/ui/ScrollDown';

export const TopLeft = () => {
  return (
    <div className="h-full">
      <div className="h-full flex md:items-center items-start justify-center bg-black">
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
    <div className="h-full flex md:items-center items-end justify-center bg-black">
      <Orb hue={260} hoverIntensity={0.75} rotateOnHover={true} />
    </div>
  );
};
