import ArticleItemList from "@/components/ArticleListItem";
import { getCategorisedArticles } from "@/lib/articles";

const HomePage = () => {
  const articles = getCategorisedArticles();
  return (
    // <section className="mx-auto max-w-7xl flex flex-col gap-16 mb-20">
    //   <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
    //     <h1 className="mb-4">Haris Blog</h1>
    //     <p className="text-xl text-neutral-600">Your daily dose of insights</p>
    //   </header>
    //   <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
    //     {articles &&
    //       Object.keys(articles).map((article) => (
    //         <ArticleItemList
    //           category={article}
    //           articles={articles[article]}
    //           key={article}
    //         />
    //       ))}
    //   </section>
    // </section>

    <div className="min-h-screen bg-gray-100">
      {/* <header className="font-cormorantGaramond font-light  space-y-4 text-6xl text-neutral-900 text-center">
        <h1 className="mb-4">Haris Blog</h1>
        <p className="text-xl text-neutral-600">Your daily dose of insights</p>
      </header> */}

      <header className="flex flex-col items-center justify-center py-12 space-y-6 text-center bg-gradient-to-b from-primary-50 to-primary-100 shadow-lg rounded-lg">
        {/* Blog Title */}
        <h1 className="text-5xl font-bold font-serif text-primary-900 tracking-wide">
          Haris Blog
        </h1>

        {/* Blog Subtitle */}
        <p className="text-lg font-medium text-neutral-600">
          Your daily dose of insights
        </p>

        {/* Decorative Line */}
        <div className="h-1 w-16 bg-primary-500 rounded-full"></div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles &&
            Object.keys(articles).map((category) => (
              <div key={category} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">{category}</h2>
                  <ArticleItemList
                    category={category}
                    articles={articles[category]}
                  />
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
