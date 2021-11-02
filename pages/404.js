import notFoundStyles from "../components/NotFound.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);

  return (
    <div className={notFoundStyles.notFound}>
      <h1 className={notFoundStyles.nfHeader}>404</h1>
      <h2>Ooops! That page cannot be found</h2>
      <p>
        Redirecting to the{" "}
        <Link href="/">
          <a>Homepage</a>
        </Link>{" "}
        for more marmite goodness...
      </p>
    </div>
  );
}
