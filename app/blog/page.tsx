import ArticleItemList from "@/components/ArticleListItem";
import { getCategorisedArticles } from "@/lib/articles";

const HomePage = () => {
  const articles = getCategorisedArticles();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex flex-col items-center justify-center py-12 space-y-6 text-center bg-gradient-to-b from-primary-50 to-primary-100 shadow-lg rounded-lg">
        {/* Blog Title */}
        <h1 className="text-5xl font-bold font-cormorantGaramond text-primary-900 tracking-wide">
          Haris Blog
        </h1>
        <p className="text-lg font-medium text-neutral-600">
          Your daily dose of insights
        </p>
        <div className="h-1 w-16 bg-primary-500 rounded-full"></div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles &&
            Object.keys(articles).map((category) => (
              <div key={category} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4 font-poppins">{category}</h2>
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
