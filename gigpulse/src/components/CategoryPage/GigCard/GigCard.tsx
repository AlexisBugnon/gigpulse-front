import { useAppSelector } from "../../../hooks/redux";
import Card from "../../Card/Card";

export default function GigCard() {
  const { categoryGigs } = useAppSelector((state) => state.categoryGigs);

  return (
    <>
      <div className="mb-12 mx-auto max-w-7xl p-6 lg:p-8">
        <div className="mt-12 text-base"></div>
        <div className="flex flex-wrap justify-around text-base">
          {categoryGigs.map((gig) => (
            <Card key={gig.id} gig={gig} />
          ))}
        </div>
      </div>
    </>
  );
}
