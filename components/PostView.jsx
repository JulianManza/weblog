import Link from "next/link";

const PostView = (post) => {
  return (
    <div className="bg-slate-700 p-4 h-full flex flex-col">
      <div className="flex-grow">
      <h1 className="text-justify">{post.title}</h1>
      <p className="text-justify">{post.subtitle}</p>
      <Link href={`blog/${post.slug}`}>
        Leer más...
      </Link>
      </div>
    </div>      
      

  );
}

export default PostView;