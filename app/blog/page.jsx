import getPost from "@/lib/getData";
import PostView from "@/components/PostView";

export default async function Page() {
  const posts = await getPost();
    return (
    <div className="bg-slate-400 grid grid-cols-2 gap-4 m-24">
      {posts.map((post) => (
        <PostView  key={posts.slug} {...post} />
      ))
      }
    </div>
  );
}