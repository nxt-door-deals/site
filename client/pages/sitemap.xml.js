import axios from "axios";
import keys from "../utils/keys";

const Sitemap = (props) => {
  var priority;

  const urlSet = props.urls.map((url) => {
    if (url === "/" || url)
      switch (url) {
        case "/":
          priority = 0.9;
          break;
        case "/login":
        case "/registeruser":
        case "/ourstory":
          priority = 0.7;
          break;
        default:
          priority = 0.6;
      }

    return `<url><loc>${keys.SERVER}${url}</loc><priority>${priority}</priority></url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  return <div className="font-sans">{sitemap}</div>;
};

export const getServerSideProps = async (context) => {
  let dynamicUrls = await axios.get(`${process.env.API_URL}/sitemap`);
  return {
    props: {
      urls: dynamicUrls.data,
    },
  };
};

export default Sitemap;
