import Star from '../Star/Star';

export default function Rating({ rate }) {
  const stars = [];

  for (let index = 1; index <= 5; index += 1) {
    stars.push(<Star key={index} filled={index <= Math.round(rate)} />);
  }

  return <div className="rating">{stars}</div>;
}
