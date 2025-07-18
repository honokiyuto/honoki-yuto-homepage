type Props = {
  src: string;
  alt: string;
  isCover?: boolean;
  isTop?: boolean;
};
export const ImageCommon = ({
  src,
  alt,
  isCover = true,
  isTop = false,
}: Props) => {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <div className="h-full flex items-center justify-center">
      <img
        src={`${baseUrl}${src}`}
        alt={alt}
        className={`w-full h-full ${isCover ? 'object-cover' : 'object-contain'} ${isTop ? 'object-top' : 'object-center'}`}
      />
    </div>
  );
};
