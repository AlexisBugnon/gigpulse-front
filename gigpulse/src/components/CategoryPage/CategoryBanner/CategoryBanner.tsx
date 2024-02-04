import { useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";

const acceptedPicture = ["audio-video-banner.jpg", "business-banner.jpg", "development-banner.jpg", "everyday-life-banner.jpg", "graphism-banner.jpg", "marketing-banner.jpg", "training-banner.jpg", "writing-banner.jpg"];

export default function CategoryBanner() {
  const categories = useAppSelector((state) => state.categories.categories);
  const param = useParams();
  const id = param.id ? parseInt(param.id, 10) : 0;
  const defaultImageUrl = "../../../../assets/images/default-banner.jpg";
  const { picture, name, description } =
    categories.find((category) => category.id === id) || {};

  return (
    <div className="mt-12 w-full relative">
      <div className="aspect-w-16 aspect-h-9">
        {acceptedPicture.includes(picture as string) ? (
          <img
            src={`../../../../assets/images/${picture}`}
            alt=""
            className="object-cover object-center w-full h-full rounded-t-xl"
          />) : (
          <img
            src={defaultImageUrl}
            alt=""
            className="object-cover object-center w-full h-full rounded-t-xl"
          />
        )}
      </div>
      <div
        className="absolute inset-0 flex flex-col items-start justify-center p-4 sm:p-6 backdrop-filter text-white rounded-t-xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">
          {name || "Loading..."}
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">
          {description || "Loading description..."}
        </p>
      </div>
    </div>
  );
}
