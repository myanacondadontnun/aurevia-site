import type { Metadata } from "next";
import HomePage from "../page";

// The homepage lives at "/". This route only exists so old /home links still
// resolve if the host-level 301 in public/_redirects is ever missing; it is
// canonicalised to "/" so it never competes with the real homepage.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://aurevia.io/",
  },
};

export default HomePage;
