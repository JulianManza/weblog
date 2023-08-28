import getPosts from "@/lib/getData";
import getPostsBySlug from "@/lib/getData";

const posts = await getPosts();

export const generateStaticParams = async () => {
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = async (props) => {
  const slug = props.params.slug;
  const { title, html, time, date } = posts.find((post) => post.slug === slug);
  return (
    <div className='prose dark:prose-dark'>
      <h1>{title}</h1>
      <h2 className='text-sm'>
        {time} {date}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default PostPage;
