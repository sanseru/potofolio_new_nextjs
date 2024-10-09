import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { getArticleData } from "@/lib/articles"

const Article = async ({ params }: { params: { slug: string } }) => {
  const articleData = await getArticleData(params.slug)

  return (
    <section className="mx-auto w-10/12 md:w-1/2 flex flex-col gap-5 p-6  space-y-4 bg-white rounded-lg shadow-lg"> {/* Added padding, background, rounded corners, and shadow */}
      <div className="flex justify-between items-center font-poppins">
        <Link href="/blog" className="flex flex-row gap-1 items-center text-blue-500 hover:underline"> {/* Hover effect for link */}
          <ArrowLeftIcon width={20} className="text-blue-500" />
          <p>Back to Home</p>
        </Link>
        <p className="text-sm text-gray-500">{articleData.date}</p> 
      </div>
      <article
        className="article text-gray-700" // Added text color for better readability
        dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
      />
    </section>
  )
}

export default Article
