import ArticleItemList from "@/components/ArticleListItem"
import { getCategorisedArticles } from "@/lib/articles"

const HomePage = () => {
  const articles = getCategorisedArticles()
  return (
<section className="mx-auto max-w-7xl  md:w-1/2 mt-0 flex flex-col gap-16 mb-20">
  <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
    <h1 className="mb-4">Haris Blog</h1>
    <p className="text-xl text-neutral-600">Your daily dose of insights</p> {/* Added subtitle */}
  </header>
  <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
    {articles !== null &&
      Object.keys(articles).map((article) => (
        <ArticleItemList
          category={article}
          articles={articles[article]}
          key={article}
        />
      ))}
  </section>
</section>

  )
}

export default HomePage
