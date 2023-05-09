import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import BrandExample from "./UI/nav";

function NewsPage({ articles }) {
  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrandExample />
      <Head>
        <title>News Page</title>
      </Head>
      <h1>Latest News</h1>
      <div className="container">
        <div className="row">
          <div className="bg-card col-12 news-card">
            {articles.map((article) => (
              <div className="col-md-4 p-2" key={article.url}>
                <div className="card">
                  <div className="card_img_transform">
                    <img
                      src={article.image}
                      className="card-img-top"
                      alt={article.title}
                      width="100%"
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">
                      {article.title
                        .split(" ")
                        .slice(0, 8)
                        .join(" ")}
                      {article.title.split(" ").length > 8 ? "..." : ""}
                    </h2>{" "}
                    <p className="card-text">
                      Description:{" "}
                      {article.description
                        .split(" ")
                        .slice(0, 24)
                        .join(" ")}
                      {article.title.split(" ").length > 24 ? "..." : ""}
                    </p>
                    <p className="card-text">
                      Published At: {article.published_at}
                    </p>
                    <Link href={article.url}>
                      <p>Read More</p>
                    </Link>
                    <p className="card-text">Source: {article.source}</p>
                    <p className="card-text">Author: {article.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

NewsPage.getInitialProps = async () => {
  const apiKey = "3272e3e7cd96afb6e3d6b03c29d35c62";
  const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=technology&languages=en&sort=published_desc&limit=21`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return { articles: data.data };
};

export default NewsPage;
