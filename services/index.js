import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        exerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }   
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}

export const getPostDetails = async (slug) => {
    const query = gql`
        query getPostDetails ($slug: String!) {
            post ( where : { slug: $slug } ){
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                exerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }
    `

    const result = await request(graphqlAPI, query, {slug});

    return result.post;
}

export const getRecentPosts = async () => {
    const query = gql`
        query getPostDetails {
            posts(orderBy: createdAt_ASC, last: 3) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query getPostDetails ($slug:String!, $categories:[String!]){
            posts(
                where: {slug_not:$slug, AND: {categories_some: {slug_in: $categories}}},
                last: 3
            ) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
            }
        }
    `
    const result = await request(graphqlAPI, query, { categories, slug });

    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query MyQuery {
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.categories;
}

export const submitComment = async (obj) => {
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj),
    })

    return res.json();
}

export const getComments = async (slug) => {
    const query = gql`
        query MyQuery ($slug: String!){
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `
    const result = await request(graphqlAPI, query, { slug });

    return result.comments;
}

export const getFeaturedPosts = async () => {
    const query = gql`
        query GetFeaturedPosts {
            posts(where: {featuredPost: true}) {
                title
                slug
                createdAt
                featuredImage {
                    url
                }
                author {
                    name
                    photo {
                        url
                    }
                }
            }
        }

    `
    const result = await request(graphqlAPI, query);

    return result.posts;
}



export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        exerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
}

export const getCategoryName = async ( slug ) => {
    const query = gql`
        query MyQuery ($slug: String!) {
            category(where: {slug: $slug}) {
                name
            }
        }
    `
    const result = await request(graphqlAPI, query, { slug });

    return result.category;
}