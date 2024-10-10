import Link from "next/link"
import type { ArticleItem } from "@/types"

interface Props {
  category: string
  articles: ArticleItem[]
}

const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <ul className="space-y-4 font-poppins">
    {articles.map((article, index) => (
      <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
        <Link href={`/blog/${article.id}`} className="group">
          <h3 className="text-lg font-semibold text-primary group-hover:text-primary-focus transition-colors duration-200">
            {article.title}
          </h3>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <span className="mr-2">{article.date}</span>
            <span className="badge badge-outline badge-sm">{category}</span>
          </div>
        </Link>
      </li>
    ))}
  </ul>
  )
}

export default ArticleItemList
