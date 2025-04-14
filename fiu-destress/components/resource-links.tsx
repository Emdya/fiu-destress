import { ExternalLink } from "lucide-react"

export function ResourceLinks() {
  const resources = [
    {
      title: "Library Hours",
      description: "Check Green Library extended hours during finals",
      url: "https://library.fiu.edu/hours",
      icon: "📚",
    },
    {
      title: "Study Rooms",
      description: "Reserve a study room on campus",
      url: "https://library.fiu.edu/studyrooms",
      icon: "🏢",
    },
    {
      title: "Tutoring Services",
      description: "Free tutoring available for most subjects",
      url: "https://case.fiu.edu/tutoring/",
      icon: "👨‍🏫",
    },
    {
      title: "Counseling Services",
      description: "Mental health support for students",
      url: "https://studentaffairs.fiu.edu/health-and-fitness/counseling-and-psychological-services/",
      icon: "🧠",
    },
    {
      title: "Final Exam Schedule",
      description: "Check your exam times and locations",
      url: "https://onestop.fiu.edu/classes/final-exam-schedule/",
      icon: "📝",
    },
    {
      title: "FIU Canva",
      description: "Access Canva for creating study materials (Press 'C' for quick access)",
      url: "https://fiu.instructure.com/login/canvas",
      icon: "🎨",
    },
  ]

  return (
    <div className="space-y-3">
      {resources.map((resource, index) => (
        <a
          key={index}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start p-2 rounded-md hover:bg-blue-50 transition-colors"
        >
          <div className="mr-3 text-xl">{resource.icon}</div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-900 flex items-center">
              {resource.title}
              <ExternalLink className="ml-1 h-3 w-3 text-blue-400" />
            </h3>
            <p className="text-xs text-gray-600">{resource.description}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
