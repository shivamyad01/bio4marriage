import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog - Bio4Marriage',
  description: 'Read our latest articles on creating the perfect marriage biodata, relationship advice, and success stories.',
};

const blogPosts = [
  {
    id: 1,
    title: '10 Tips for Creating an Impressive Marriage Biodata',
    excerpt: 'Learn how to create a biodata that stands out and makes a great first impression.',
    date: 'May 15, 2023',
    readTime: '5 min read',
    category: 'Tips',
    image: '/images/blog/biodata-tips.jpg',
    slug: '10-tips-impressive-marriage-biodata',
  },
  {
    id: 2,
    title: 'The Do\'s and Don\'ts of Writing a Biodata',
    excerpt: 'Avoid common mistakes and learn what to include (and what to leave out) in your biodata.',
    date: 'April 28, 2023',
    readTime: '7 min read',
    category: 'Guide',
    image: '/images/blog/dos-and-donts.jpg',
    slug: 'dos-and-donts-biodata',
  },
  {
    id: 3,
    title: 'Success Story: How Priya Found Her Perfect Match',
    excerpt: 'Read how Priya used Bio4Marriage to create a biodata that caught her future husband\'s attention.',
    date: 'April 10, 2023',
    readTime: '8 min read',
    category: 'Success Story',
    image: '/images/blog/success-story.jpg',
    slug: 'success-story-priya',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Latest articles and resources to help you create the perfect marriage biodata and navigate the journey to finding your life partner.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="h-48 bg-gray-100 relative overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <time dateTime={new Date(post.date).toISOString().split('T')[0]}>{post.date}</time>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-pink-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get the latest tips, success stories, and updates delivered straight to your inbox.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
