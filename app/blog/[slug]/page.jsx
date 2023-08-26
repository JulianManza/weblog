import getPosts from "@/lib/getData";
import getPostsBySlug from "@/lib/getData";


export const generateStaticParams = async () => {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }));
};


const PostPage =  async (props) => {
  const slug  = props.params.slug;
  const {title, html, time, date} = (await getPosts()).find((post) => post.slug === slug);
  return (
    <div className="prose dark:prose-dark dark:bg-zinc-800 m-auto  py-12 px-24 ">
      <h1>{title}</h1>
      <h2 className="text-sm">{time} {date}</h2>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default PostPage;