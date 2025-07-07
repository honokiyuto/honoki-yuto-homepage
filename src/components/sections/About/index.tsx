import { TextTyping } from '@/components/ui/TextTyping';

export const AboutLeft = () => {
  return (
    <div className="h-full flex flex-col items-center md:justify-center gap-5 p-10">
      <TextTyping>about</TextTyping>
      <p className="text-center text-sm md:text-base">
        「Cafe」と申します。このホームページは私の趣味を発信する場として、今後の活動の出発点としたいと考えています。「エンジニアとしての私」、「絵師としての私」、「公認心理師としての私」の3つを通じて、自分を表現していけたらと思っています。
      </p>
    </div>
  );
};

export const AboutRight = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <img
        src="/img/sign_img.png"
        alt="about"
        className="h-full object-contain"
      />
    </div>
  );
};
