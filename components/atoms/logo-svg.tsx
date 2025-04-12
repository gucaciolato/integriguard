interface LogoSVGProps {
  width: number
  height: number
  className?: string
}

export default function LogoSVG({ width, height, className = "" }: LogoSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text x="0" y="50%" textAnchor="start" dominantBaseline="central" fill="#333333" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="600">
        integri
      </text>
      <text x="50%" y="50%" textAnchor="start" dominantBaseline="central" fill="#0000ff" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="600">
        guard
      </text>
    </svg>
  )
}
