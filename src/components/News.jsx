import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Tag, Search, Filter, Briefcase, Newspaper, TrendingUp, ExternalLink, RefreshCw, ArrowLeft, Bookmark, Share2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  const [activeTab, setActiveTab] = useState('trends');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [techNews, setTechNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [selectedNews, setSelectedNews] = useState(null);

  // Fetch tech news from localStorage or use sample data
  const fetchTechNews = async () => {
    setLoading(true);
    try {
      // Check if we have user-edited news data in localStorage
      const savedNews = localStorage.getItem('newsData');
      if (savedNews && savedNews !== '[]') {
        const parsedNews = JSON.parse(savedNews);
        if (parsedNews.length > 0) {
          setTechNews(parsedNews);
          setLoading(false);
          setLastUpdated(new Date().toLocaleString());
          return;
        }
      }
      
      // Try to fetch real news from a public API
      try {
        // Using a sample API for demonstration - in a real app you would use a proper news API
        // For now, we'll use the sample data but simulate an API call
        const sampleTechNews = [
          {
            id: 1,
            title: "New JavaScript Frameworks Revolutionizing Frontend Development",
            excerpt: "Exploring cutting-edge frameworks that are changing how developers build modern web applications.",
            content: "The landscape of frontend development is rapidly evolving with the introduction of new JavaScript frameworks that promise better performance, easier maintenance, and enhanced developer experience. Frameworks like SvelteKit, Astro, and Qwik are gaining popularity for their unique approaches to solving common web development challenges.\n\nSvelteKit, for instance, compiles your application at build time, resulting in smaller bundles and faster load times. Astro takes a different approach by shipping zero JavaScript by default, allowing developers to bring their own framework only when needed. Qwik focuses on resumability, enabling instant loading of applications regardless of their size.\n\nThese frameworks are particularly appealing to developers working on performance-critical applications or those looking to reduce bundle sizes. As the web continues to evolve, we can expect these frameworks to mature and potentially influence the next generation of web standards.",
            source: "TechCrunch",
            date: "2024-01-15",
            category: "Web Development",
            readTime: "5 min read",
            url: "https://techcrunch.com",
            author: "Jane Smith",
            tags: ["JavaScript", "Frameworks", "Frontend", "Performance"]
          },
          {
            id: 2,
            title: "Machine Learning Integration in Enterprise Software",
            excerpt: "How companies are leveraging AI to enhance productivity and automate complex workflows.",
            content: "Enterprise software is undergoing a transformation as machine learning capabilities become increasingly integrated into business applications. From customer relationship management systems to supply chain optimization tools, AI is enabling organizations to make data-driven decisions faster and more accurately.\n\nLeading enterprise software providers are embedding machine learning algorithms to predict customer behavior, optimize pricing strategies, and automate routine tasks. Salesforce Einstein, for example, uses AI to provide predictive insights and automate sales processes. SAP Leonardo incorporates machine learning to enhance enterprise resource planning.\n\nHowever, successful implementation requires more than just integrating AI features. Organizations must invest in data quality, establish ethical guidelines, and ensure their workforce is trained to work alongside AI systems. Companies that master this balance are seeing significant ROI through increased efficiency and improved decision-making.",
            source: "IEEE Computer Society",
            date: "2024-01-12",
            category: "Artificial Intelligence",
            readTime: "8 min read",
            url: "https://ieeecomputer.org",
            author: "Dr. Robert Chen",
            tags: ["AI", "Machine Learning", "Enterprise", "Automation"]
          },
          {
            id: 3,
            title: "Best Practices for Cloud-Native Application Development",
            excerpt: "Essential strategies for building and deploying scalable cloud-native applications.",
            content: "Cloud-native development has become the standard for building modern, scalable applications. Organizations adopting cloud-native approaches are seeing benefits in terms of deployment speed, scalability, and resilience. However, success requires adherence to specific principles and practices.\n\nMicroservices architecture is fundamental to cloud-native development, allowing teams to develop, deploy, and scale services independently. Containerization with Docker ensures consistency across environments, while orchestration platforms like Kubernetes automate deployment and scaling.\n\nObservability is crucial for monitoring distributed systems. Implementing comprehensive logging, metrics collection, and distributed tracing enables teams to quickly identify and resolve issues. Security must be integrated throughout the development lifecycle, with practices like automated security scanning and secrets management.\n\nOrganizations should also embrace DevOps culture, automating CI/CD pipelines and implementing infrastructure as code. These practices, combined with proper team organization and skill development, form the foundation of successful cloud-native transformation.",
            source: "AWS Blog",
            date: "2024-01-10",
            category: "Cloud Computing",
            readTime: "6 min read",
            url: "https://aws.amazon.com/blogs/",
            author: "Michael Rodriguez",
            tags: ["Cloud", "Microservices", "DevOps", "Kubernetes"]
          },
          {
            id: 4,
            title: "Emerging Cybersecurity Threats in 2024",
            excerpt: "New security challenges developers need to be aware of to protect applications.",
            content: "As technology advances, so do the tactics employed by cybercriminals. Developers and security professionals must stay vigilant against emerging threats that could compromise applications and data.\n\nSupply chain attacks are becoming increasingly sophisticated, targeting third-party dependencies and development tools. The SolarWinds attack demonstrated how devastating these attacks can be, affecting thousands of organizations. Developers should implement software composition analysis tools and maintain detailed inventories of dependencies.\n\nAI-powered attacks represent a growing concern, with threat actors using machine learning to automate phishing campaigns, bypass security controls, and discover vulnerabilities. Traditional signature-based detection methods may prove inadequate against these adaptive threats.\n\nZero-trust security models are gaining traction as organizations recognize that perimeter-based security is insufficient. Implementing zero-trust requires verifying every request, regardless of origin, and implementing least-privilege access controls. As we progress through 2024, staying informed about these threats and implementing proactive defenses will be crucial.",
            source: "SecurityWeek",
            date: "2024-01-08",
            category: "Cybersecurity",
            readTime: "7 min read",
            url: "https://securityweek.com",
            author: "Sarah Johnson",
            tags: ["Security", "Threats", "Zero Trust", "AI"]
          },
          {
            id: 5,
            title: "The Rise of Low-Code Platforms in Software Development",
            excerpt: "How no-code and low-code solutions are democratizing software development.",
            content: "Low-code and no-code platforms are revolutionizing software development by enabling business users to create applications without extensive programming knowledge. These platforms are particularly valuable for organizations looking to accelerate digital transformation while reducing reliance on scarce development resources.\n\nMajor players like Microsoft Power Platform, Mendix, and OutSystems are providing drag-and-drop interfaces, pre-built components, and integrations with popular enterprise systems. Business analysts and subject matter experts can now build workflows, dashboards, and simple applications that previously required weeks of development time.\n\nHowever, the rise of low-code doesn't eliminate the need for professional developers. Instead, it shifts their focus toward more complex challenges while empowering business users to solve simpler problems independently. Organizations must establish governance frameworks to ensure quality, security, and maintainability of low-code applications.\n\nThe future likely involves a hybrid approach where professional developers and citizen developers collaborate, with low-code platforms handling routine tasks and traditional development addressing complex requirements. This democratization of development has the potential to significantly increase organizational agility.",
            source: "Forbes Technology",
            date: "2024-01-05",
            category: "Development Tools",
            readTime: "4 min read",
            url: "https://forbes.com",
            author: "David Kim",
            tags: ["Low-Code", "No-Code", "Productivity", "Digital Transformation"]
          },
          {
            id: 6,
            title: "DevOps Trends Shaping 2024: Automation and Beyond",
            excerpt: "Key trends in DevOps that are streamlining development and deployment processes.",
            content: "DevOps continues to evolve as organizations seek to improve software delivery speed and reliability. Several key trends are shaping the DevOps landscape in 2024, driven by advances in automation, platform engineering, and generative AI.\n\nPlatform engineering has emerged as a critical discipline, focusing on creating self-service platforms that enable development teams to operate more autonomously. Rather than burdening developers with infrastructure concerns, platform engineering teams provide curated tools and services that abstract away complexity while maintaining security and compliance.\n\nGenerative AI is beginning to impact DevOps workflows, assisting with code generation, test creation, and incident response. AI-powered tools can analyze logs to identify patterns, suggest optimizations, and even predict potential issues before they occur.\n\nGitOps practices are gaining mainstream adoption, treating infrastructure and application configurations as code stored in version control systems. This approach improves auditability, enables rollbacks, and facilitates collaboration between teams.\n\nAs we advance through 2024, organizations that successfully integrate these trends into their DevOps practices will gain competitive advantages through faster time-to-market and improved software quality.",
            source: "DevOps.com",
            date: "2024-01-03",
            category: "DevOps",
            readTime: "6 min read",
            url: "https://devops.com",
            author: "Alex Thompson",
            tags: ["DevOps", "Automation", "Platform Engineering", "GitOps"]
          }
        ];
        
        setTimeout(() => {
          setTechNews(sampleTechNews);
          setLoading(false);
          setLastUpdated(new Date().toLocaleString());
        }, 1000);
      } catch (apiError) {
        console.error('Error fetching from API, using sample data:', apiError);
        // Fallback to sample data if API fails
        const sampleTechNews = [
          {
            id: 1,
            title: "New JavaScript Frameworks Revolutionizing Frontend Development",
            excerpt: "Exploring cutting-edge frameworks that are changing how developers build modern web applications.",
            content: "The landscape of frontend development is rapidly evolving with the introduction of new JavaScript frameworks that promise better performance, easier maintenance, and enhanced developer experience. Frameworks like SvelteKit, Astro, and Qwik are gaining popularity for their unique approaches to solving common web development challenges.\n\nSvelteKit, for instance, compiles your application at build time, resulting in smaller bundles and faster load times. Astro takes a different approach by shipping zero JavaScript by default, allowing developers to bring their own framework only when needed. Qwik focuses on resumability, enabling instant loading of applications regardless of their size.\n\nThese frameworks are particularly appealing to developers working on performance-critical applications or those looking to reduce bundle sizes. As the web continues to evolve, we can expect these frameworks to mature and potentially influence the next generation of web standards.",
            source: "TechCrunch",
            date: "2024-01-15",
            category: "Web Development",
            readTime: "5 min read",
            url: "https://techcrunch.com",
            author: "Jane Smith",
            tags: ["JavaScript", "Frameworks", "Frontend", "Performance"]
          },
          {
            id: 2,
            title: "Machine Learning Integration in Enterprise Software",
            excerpt: "How companies are leveraging AI to enhance productivity and automate complex workflows.",
            content: "Enterprise software is undergoing a transformation as machine learning capabilities become increasingly integrated into business applications. From customer relationship management systems to supply chain optimization tools, AI is enabling organizations to make data-driven decisions faster and more accurately.\n\nLeading enterprise software providers are embedding machine learning algorithms to predict customer behavior, optimize pricing strategies, and automate routine tasks. Salesforce Einstein, for example, uses AI to provide predictive insights and automate sales processes. SAP Leonardo incorporates machine learning to enhance enterprise resource planning.\n\nHowever, successful implementation requires more than just integrating AI features. Organizations must invest in data quality, establish ethical guidelines, and ensure their workforce is trained to work alongside AI systems. Companies that master this balance are seeing significant ROI through increased efficiency and improved decision-making.",
            source: "IEEE Computer Society",
            date: "2024-01-12",
            category: "Artificial Intelligence",
            readTime: "8 min read",
            url: "https://ieeecomputer.org",
            author: "Dr. Robert Chen",
            tags: ["AI", "Machine Learning", "Enterprise", "Automation"]
          }
        ];
        
        setTimeout(() => {
          setTechNews(sampleTechNews);
          setLoading(false);
          setLastUpdated(new Date().toLocaleString());
        }, 1000);
      }
    } catch (error) {
      console.error('Error fetching tech news:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechNews();
    
    // Set up interval to auto-refresh news every 30 minutes
    const interval = setInterval(() => {
      fetchTechNews();
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => clearInterval(interval);
  }, []);

  const filteredNews = techNews.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const handleBackToList = () => {
    setSelectedNews(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home Button */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <Home size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>
      
      {selectedNews ? (
        // Detailed News View
        <div>
          <button 
            onClick={handleBackToList}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to News
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{selectedNews.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{selectedNews.readTime}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>{selectedNews.author}</span>
                </div>
                <div className="flex items-center">
                  <Tag size={16} className="mr-2" />
                  <span>{selectedNews.category}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{selectedNews.title}</h1>
              
              <div className="prose max-w-none mb-8">
                {selectedNews.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedNews.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href={selectedNews.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-600 hover:text-primary-700"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Read Original Article
                </a>
                <button className="flex items-center text-gray-600 hover:text-gray-800">
                  <Bookmark size={16} className="mr-2" />
                  Save Article
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-800">
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // News Listing View
        <div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Latest Tech News & Updates</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest trends, innovations, and developments in the technology industry.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="animate-spin mx-auto mb-4 text-primary-600" size={32} />
                <p>Loading latest news...</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredNews.map((item) => (
                    <div 
                      key={item.id} 
                      className="card cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      onClick={() => handleNewsClick(item)}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-3 line-clamp-2">{item.title}</h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {item.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={14} className="mr-1" />
                            {item.readTime}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <User size={14} className="mr-1" />
                            {item.author}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredNews.length === 0 && (
                  <div className="text-center py-12">
                    <Newspaper className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-xl font-bold mb-2">No articles found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </div>
                )}
                
                <div className="text-center text-sm text-gray-500 mt-8">
                  Last updated: {lastUpdated}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;