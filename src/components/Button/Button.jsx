export default function Button({ text, onClick }) {
  return (
    <button type="button" className="buy-button" onClick={onClick}>
      {text}
    </button>
  );
}