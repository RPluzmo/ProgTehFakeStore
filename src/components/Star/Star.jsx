export default function Star({ filled }) {
  return <span className={filled ? 'star filled' : 'star'}>{'\u2605'}</span>;
}
