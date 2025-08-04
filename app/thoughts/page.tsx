import { ThoughtIcon } from "@/components/icons"
import { getPosts } from "@/lib/sanity"

const formatDate = (dateString: string) => {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function ThoughtsPage() {
  const posts = await getPosts()

  return (
    <div className="bg-brand-background text-brand-text min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <ThoughtIcon className="mx-auto h-12 w-12 text-brand-accent" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight font-header text-brand-text sm:text-6xl">Thoughts</h1>
          <p className="mt-6 text-lg leading-8 text-brand-text/80 font-body">
            A collection of ideas, explorations, and reflections on technology, design, and the space in between.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-3xl space-y-16">
          {posts.map((post) => (
            <article key={post._id} className="relative isolate group">
              <p className="text-sm leading-6 text-brand-text/60 font-body">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-8 text-brand-text group-hover:text-brand-accent font-header transition-colors">
                <span className="absolute inset-0 z-10" />
                {post.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-text/80 font-body">{post.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
