import { MdStarBorder, MdStar } from "react-icons/md";

export default function RatingStars({ averageRating } : { averageRating: number}) {
  const totalStars = 5; // Le nombre total d'étoiles

  // Crée un tableau de composants d'étoiles pleines et vides en fonction de averageRating
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= averageRating) {
      stars.push(<MdStar key={i} className="text-yellow-400" />);
    } else {
      stars.push(<MdStarBorder key={i} className="text-gray-400" />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
}
