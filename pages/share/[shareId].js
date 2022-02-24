import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
/*
{
  "comment": [
    
  ],
  "count": 1,
  "post": {
    "age": "11 hours",
    "code": "WlAhkfW8",
    "comment_count": 0,
    "confirmed": null,
    "content": "",
    "created_ts": "2022-02-23 22:19:48",
    "id": 933,
    "like_count": 1,
    "mission_name": "2022년 몸변태 100일프로젝",
    "path": "https://xhnagers-upload-beta.s3.ap-northeast-2.amazonaws.com/FCB473D9-24AF-48AD-865A-960E6E97AB68.jpeg",
    "profile_picture": null,
    "suspicious": null,
    "type": "image",
    "user_id": 27,
    "user_name": "김승규"
  },
  "stat": [
    {
      "name": "운동시간",
      "unit": "분",
      "upload_id": 933,
      "value": "15"
    },
    {
      "name": "거리",
      "unit": "km",
      "upload_id": 933,
      "value": "2.92"
    }
  ]
}
*/
export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://dev.xhangers.com:7000/post/public/${params.shareId}`
  );
  const shareData = await res.json();
  return {
    props: {
      shareData,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths: [{ params: { shareId: "WlAhkfW8" } }], fallback: "blocking" };
}

function IndexPage({ shareData, params }) {
  const router = useRouter();
  const { shareId } = router.query;

  useEffect(() => {
    Router.push(`http://dev.xhangers.com/post/${shareId}`);
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
      <p>redirect to growthon</p>
    </div>
  );
}

export default IndexPage;
