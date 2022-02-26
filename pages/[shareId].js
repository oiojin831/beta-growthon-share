import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://beta.growthon.io:7000/post/public/${params.shareId}`
  );
  const shareData = await res.json();
  return {
    props: {
      shareData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return { paths: [{ params: { shareId: "rTzRrFXM" } }], fallback: "blocking" };
}

function IndexPage({ shareData }) {
  const router = useRouter();
  const { shareId } = router.query;

  useEffect(() => {
    Router.push(`http://beta.growthon.io/post/${shareId}`);
  }, [shareId]);

  return (
    <div>
      <Head>
        <meta
          property="og:title"
          content={shareData.post?.mission_name}
          key="title"
        />
        <meta property="og:image" content={`${shareData.post?.path}`} />
      </Head>
    </div>
  );
}

export default IndexPage;
