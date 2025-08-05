import { User, Briefcase, Brain } from "lucide-react"

export function PersonIcon({ className }: { className?: string }) {
  return <User className={className} />
}

export function ProjectIcon({ className }: { className?: string }) {
  return <Briefcase className={className} />
}

export function ThoughtIcon({ className }: { className?: string }) {
  return <Brain className={className} />
}
