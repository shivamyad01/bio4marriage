import Link from 'next/link';

const TemplatesPage = () => {
  const templates = [
    {
      id: 1,
      name: 'Classic Elegance',
      description: 'A timeless design perfect for traditional marriage profiles',
      category: 'Traditional',
      preview: '/template1.jpg',
    },
    {
      id: 2,
      name: 'Modern Minimalist',
      description: 'Clean and contemporary design for a professional look',
      category: 'Modern',
      preview: '/template2.jpg',
    },
    {
      id: 3,
      name: 'Royal Heritage',
      description: 'Rich design for showcasing family heritage and values',
      category: 'Traditional',
      preview: '/template3.jpg',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Biodata Templates</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our professionally designed templates to create a stunning marriage biodata that stands out.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Template Preview {template.id}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                  <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/create?template=${template.id}`}
                    className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Use This Template
                  </Link>
                  <button className="text-pink-600 hover:text-pink-800">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
