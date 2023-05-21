const badgeTwClass = `bg-blue-500 text-white`

function Badge({ text, className }: { text: string; className?: string }) {
  return <div className={`${badgeTwClass} ${className}`}>{text}</div>
}
export default Badge
