import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";

import type { ArticleItem } from "@/types";
import { title } from "process";

const articlesDirectory = path.join(process.cwd(), "articles");
console.log(articlesDirectory);
const getSortedArticles = (): ArticleItem[] => {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames.map((fileName) => {
    console.log(fileName);
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
    };
  });

  return allArticlesData.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dateOne = moment(a.date, format);
    const dateTwo = moment(b.date, format);

    if (dateOne.isBefore(dateTwo)) {
        return -1; // a comes before b
    } else if (dateOne.isAfter(dateTwo)) {
        return 1; // a comes after b
    } else {
        return 0; // a and b are equal
    }
});

};

export const getCategorisedArticles = (): Record<string, ArticleItem[]> => {
  const sortedArticles = getSortedArticles();
  const categoriesedArticles: Record<string, ArticleItem[]> = {};

  sortedArticles.forEach((article) => {
    console.log(article.category);
    if (!categoriesedArticles[article.category]) {
      categoriesedArticles[article.category] = [];
    }

    categoriesedArticles[article.category].push(article)
  });
  return categoriesedArticles
};

export const getArticleData = async (id: string) => {
  const fullPath = path.join(articlesDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM Do YYYY"),
  };
};
