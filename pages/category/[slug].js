import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { Categories, Loader, PostCard } from '../../components'
import { getCategories, getCategoryPost } from '../../services'

const CategoryPosts = ({ posts }) => {

    const router = useRouter();
    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>category | Next Blog Powered by GraphCMS</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post.node} />
                        ))}
                        {posts.length <= 0 && 'No posts have been added to this category 👀'}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPosts


export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
    const categories = await getCategories();
    return {
      paths: categories.map(({ slug }) => ({ params: { slug } })),
      fallback: true,
    };
}