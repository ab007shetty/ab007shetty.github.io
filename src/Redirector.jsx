import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Redirector() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  // Map every short path to its real URL
const redirects = {
  github: "https://github.com/ab007shetty",
  blog: "https://ab007shetty.pythonanywhere.com",
  instagram: "https://instagram.com/a.b.shetty",
  linkedin: "https://linkedin.com/in/ab007shetty",
  gdev: "https://g.dev/ab007shetty",
  x: "https://x.com/abshetr",
  twitter: "https://x.com/abshetr",
  gmail: "mailto:ab007shetty@gmail.com",
  scholar: "https://scholar.google.com/citations?user=i1vJxMYAAAAJ",
  credly: "https://www.credly.com/users/anirudha-b-shetty/badges",
  coursera: "https://www.coursera.org/user/9a1f6f65c70233a4cbf41887f48e0c06",
  qwiklabs: "https://www.qwiklabs.com/public_profiles/a71f17d6-36af-4e30-b70f-8771bf211324",
  ad: "https://www.adscientificindex.com/scientist/anirudha-b-shetty/4804035",
  type: "https://monkeytype.com/profile/abshetty",
  search: "https://bit.ly/3IJ8Ds3"
};


  useEffect(() => {
    const url = redirects[slug.toLowerCase()];
    if (url) {
      window.location.replace(url);
    } else {
      // If invalid path, redirect back to homepage after slight delay
      setTimeout(() => navigate("/"), 1000);
    }
  }, [slug, navigate]);

  return <h2 style={{ textAlign: "center" }}>Redirecting&hellip;</h2>;
}
