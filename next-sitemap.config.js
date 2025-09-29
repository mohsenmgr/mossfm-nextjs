/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_DOMAIN_NAME || 'http://localhost:3000',
    generateRobotsTxt: true,
    exclude: ['/amin', '/amin/*'], // Exclude admin pages
    // Manually add /blog and dynamic posts
    additionalPaths: async (config) => {
        const paths = [
            {
                loc: '/blog', // Main blog listing page
                priority: 0.8,
                changefreq: 'daily',
                lastmod: new Date().toISOString()
            },
            {
                loc: '/about', // Main blog listing page
                priority: 0.8,
                changefreq: 'weekly',
                lastmod: new Date().toISOString()
            },
            {
                loc: '/contact', // Main blog listing page
                priority: 0.8,
                changefreq: 'weekly',
                lastmod: new Date().toISOString()
            },
            {
                loc: '/feed', // Main blog listing page
                priority: 0.8,
                changefreq: 'daily',
                lastmod: new Date().toISOString()
            },
            {
                loc: '/work', // Main blog listing page
                priority: 0.8,
                changefreq: 'daily',
                lastmod: new Date().toISOString()
            }
        ];

        try {
            // Fetch all blog posts from your API
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog`);
            if (!res.ok) throw new Error('Failed to fetch blog posts for sitemap');

            const posts = await res.json();
            posts.forEach((post) => {
                paths.push({
                    loc: `/blog/${post._id}`, // Dynamic blog post
                    priority: 0.7,
                    changefreq: 'weekly',
                    lastmod: new Date(post.date).toISOString()
                });
            });
        } catch (err) {
            console.error('Sitemap generation error:', err);
        }

        return paths;
    }
};
