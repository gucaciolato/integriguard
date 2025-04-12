import { CheckIcon, XIcon } from "lucide-react"

interface FeatureItemProps {
  text: string
  included?: boolean
}

export default function FeatureItem({ text, included = true }: FeatureItemProps) {
  return (
    <div className="flex items-start space-x-3 mb-4 text-left">
      <div className="flex-shrink-0 mt-0.5">
        {included ? <CheckIcon className="h-5 w-5 text-green-600" /> : <XIcon className="h-5 w-5 text-red-500" />}
      </div>
      <span className={included ? "text-gray-800 font-medium" : "text-gray-500 line-through"}>{text}</span>
    </div>
  )
}
