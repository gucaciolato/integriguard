import FeatureItem from "../atoms/feature-item"

interface Feature {
  text: string
  included: boolean
}

interface FeatureListProps {
  features: Feature[]
}

export default function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="space-y-2">
      {features.map((feature, index) => (
        <FeatureItem key={index} text={feature.text} included={feature.included} />
      ))}
    </div>
  )
}
