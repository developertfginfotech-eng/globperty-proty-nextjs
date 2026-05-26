import GuideDetails from "@/components/guides/GuideDetails";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = allBlogs.find((b) => b.id == id);
  if (!blog) return { title: "Guide Not Found" };
  return {
    title: `${blog.title} | Globperty Knowledge Base`,
    description: blog.description,
  };
}

export default async function KnowledgeBasePage({ params }) {
  const { id } = await params;
  const blog = allBlogs.find((b) => b.id == id);

  if (!blog) notFound();

  return (
    <div id="wrapper">
      <Header1 />
      <div className="main-content">
        <GuideDetails blog={blog} />
        <Cta />
      </div>
      <Footer1 />
    </div>
  );
}
