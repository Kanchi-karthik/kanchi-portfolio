import React, { useState, useEffect } from 'react';
import { User, FileText, Settings, Save, Eye, EyeOff, LogOut, Newspaper, Briefcase, Home, ArrowLeft, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const SettingsDashboard = ({ isAuthenticated, onLogin, onLogout }) => {
  const [showLogin, setShowLogin] = useState(!isAuthenticated);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  
  // Profile data state
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : {
      name: 'KANCHI KARTHIK',
      title: 'Computer Science Engineer',
      email: 'kanchikarthik27798@gmail.com',
      phone: '+91 88858 28678',
      location: 'Nellore, Andhra Pradesh',
      about: 'Motivated software developer with strong foundations in Java and MERN stack development. Currently pursuing M.Tech in Computer Science & Engineering while strengthening skills in problem solving and Data Structures & Algorithms. Familiar with Python-based data handling and introductory Scikit-Learn workflows. Building full-stack applications to improve practical engineering ability and software design discipline.',
      resumeLink: '#'
    };
  });

  // News data state
  const [newsData, setNewsData] = useState(() => {
    const saved = localStorage.getItem('newsData');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing news data:', e);
      return [];
    }
  });

  // Jobs data state
  const [jobsData, setJobsData] = useState(() => {
    const saved = localStorage.getItem('jobsData');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing jobs data:', e);
      return [];
    }
  });

  // Projects data state
  const [projectsData, setProjectsData] = useState(() => {
    const saved = localStorage.getItem('projectsData');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing projects data:', e);
      return [];
    }
  });

  // Contact messages state
  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('contactMessages');
    return saved ? JSON.parse(saved) : [];
  });

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedProfile = localStorage.getItem('profileData');
    const savedNews = localStorage.getItem('newsData');
    const savedJobs = localStorage.getItem('jobsData');
    const savedProjects = localStorage.getItem('projectsData');
    const savedMessages = localStorage.getItem('contactMessages');
    
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Error parsing profile data:', e);
      }
    }
    
    if (savedNews) {
      try {
        setNewsData(JSON.parse(savedNews));
      } catch (e) {
        console.error('Error parsing news data:', e);
      }
    }
    
    if (savedJobs) {
      try {
        setJobsData(JSON.parse(savedJobs));
      } catch (e) {
        console.error('Error parsing jobs data:', e);
      }
    }
    
    if (savedProjects) {
      try {
        setProjectsData(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Error parsing projects data:', e);
      }
    }
    
    if (savedMessages) {
      try {
        setContactMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error parsing contact messages:', e);
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin(loginData)) {
      setShowLogin(false);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setShowLogin(true);
    setLoginData({ username: '', password: '' });
    navigate('/');
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Save to localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Profile data saved successfully!');
    console.log('Saved profile data:', profileData);
  };

  const handleSaveNews = () => {
    // Save to localStorage
    localStorage.setItem('newsData', JSON.stringify(newsData));
    alert('News data saved successfully!');
  };

  const handleSaveJobs = () => {
    // Save to localStorage
    localStorage.setItem('jobsData', JSON.stringify(jobsData));
    alert('Jobs data saved successfully!');
  };

  const handleSaveProjects = () => {
    // Save to localStorage
    localStorage.setItem('projectsData', JSON.stringify(projectsData));
    alert('Projects data saved successfully!');
  };

  const exportContactMessages = () => {
    if (contactMessages.length === 0) {
      alert('No messages to export');
      return;
    }
    
    // Prepare data for export
    const exportData = contactMessages.map(msg => ({
      Name: msg.name,
      Email: msg.email,
      Subject: msg.subject,
      Message: msg.message,
      Timestamp: new Date(msg.timestamp).toLocaleString()
    }));
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contact Messages');
    
    // Export to file
    const filename = `contact-messages-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  if (showLogin && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the editing dashboard</p>
            </div>
            
            <div className="card p-8">
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Email Address
                  </label>
                  <input
                    id="username"
                    type="email"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="text-gray-500" />
                      ) : (
                        <Eye size={20} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary py-3 px-4"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mr-4">
                <Home size={20} className="mr-2" />
                Home
              </Link>
              <h1 className="text-2xl font-bold">Settings Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="inline-block mr-2" size={18} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="inline-block mr-2" size={18} />
              Content
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="inline-block mr-2" size={18} />
              Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Profile Information</h2>
            <div className="card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    About Me
                  </label>
                  <textarea
                    rows={4}
                    value={profileData.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resume Link
                  </label>
                  <input
                    type="url"
                    value={profileData.resumeLink}
                    onChange={(e) => handleInputChange('resumeLink', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary px-6 py-2 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Manage Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <Newspaper className="text-primary-600 mr-3" size={24} />
                  <h3 className="text-lg font-bold">News & Updates</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Manage your news articles, project updates, and announcements.
                </p>
                <button 
                  onClick={() => setActiveTab('news')}
                  className="btn-secondary px-4 py-2"
                >
                  Edit News Content
                </button>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <Briefcase className="text-primary-600 mr-3" size={24} />
                  <h3 className="text-lg font-bold">Job Opportunities</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Add or update job listings and career opportunities.
                </p>
                <button 
                  onClick={() => setActiveTab('jobs')}
                  className="btn-secondary px-4 py-2"
                >
                  Manage Job Listings
                </button>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <FileText className="text-primary-600 mr-3" size={24} />
                  <h3 className="text-lg font-bold">Projects</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Update your featured projects and portfolio items.
                </p>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="btn-secondary px-4 py-2"
                >
                  Edit Projects
                </button>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <User className="text-primary-600 mr-3" size={24} />
                  <h3 className="text-lg font-bold">Contact Messages</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Export all contact form submissions to Excel.
                </p>
                <button 
                  onClick={exportContactMessages}
                  className="btn-secondary px-4 py-2 flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Export to Excel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage News & Updates</h2>
              <button 
                onClick={() => {
                  const newNews = {
                    id: Date.now(),
                    title: 'New Article',
                    excerpt: 'Brief description of the article',
                    content: 'Full content of the article...',
                    source: 'Your Portfolio',
                    date: new Date().toISOString().split('T')[0],
                    category: 'General',
                    readTime: '5 min read',
                    author: profileData.name,
                    tags: ['technology'],
                    url: '#'
                  };
                  setNewsData([...newsData, newNews]);
                }}
                className="btn-primary px-4 py-2"
              >
                Add New Article
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              {newsData.map((article) => (
                <div key={article.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      value={article.title}
                      onChange={(e) => {
                        const updatedNews = newsData.map(item => 
                          item.id === article.id ? {...item, title: e.target.value} : item
                        );
                        setNewsData(updatedNews);
                      }}
                      className="text-xl font-bold w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-primary-500"
                      placeholder="Article title"
                    />
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this article?')) {
                          setNewsData(newsData.filter(item => item.id !== article.id));
                        }
                      }}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={article.category}
                      onChange={(e) => {
                        const updatedNews = newsData.map(item => 
                          item.id === article.id ? {...item, category: e.target.value} : item
                        );
                        setNewsData(updatedNews);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Category"
                    />
                    <input
                      type="text"
                      value={article.date}
                      onChange={(e) => {
                        const updatedNews = newsData.map(item => 
                          item.id === article.id ? {...item, date: e.target.value} : item
                        );
                        setNewsData(updatedNews);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Date (YYYY-MM-DD)"
                    />
                  </div>
                  
                  <textarea
                    value={article.excerpt}
                    onChange={(e) => {
                      const updatedNews = newsData.map(item => 
                        item.id === article.id ? {...item, excerpt: e.target.value} : item
                      );
                      setNewsData(updatedNews);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                    rows="2"
                    placeholder="Brief excerpt"
                  ></textarea>
                  
                  <textarea
                    value={article.content}
                    onChange={(e) => {
                      const updatedNews = newsData.map(item => 
                        item.id === article.id ? {...item, content: e.target.value} : item
                      );
                      setNewsData(updatedNews);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                    rows="4"
                    placeholder="Full content"
                  ></textarea>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add tag"
                      className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const tag = e.target.value.trim();
                          if (tag && !article.tags.includes(tag)) {
                            const updatedNews = newsData.map(item => 
                              item.id === article.id ? {...item, tags: [...item.tags, tag]} : item
                            );
                            setNewsData(updatedNews);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    {article.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                        {tag}
                        <button 
                          onClick={() => {
                            const updatedTags = article.tags.filter((_, i) => i !== index);
                            const updatedNews = newsData.map(item => 
                              item.id === article.id ? {...item, tags: updatedTags} : item
                            );
                            setNewsData(updatedNews);
                          }}
                          className="ml-1 text-purple-600 hover:text-purple-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setActiveTab('content')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveNews}
                className="btn-primary px-6 py-2"
              >
                Save News
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'jobs' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Job Opportunities</h2>
              <button 
                onClick={() => {
                  const newJob = {
                    id: Date.now(),
                    title: 'New Job Position',
                    company: 'Company Name',
                    location: 'City, State',
                    salary: '₹00,000 - ₹00,000 PA',
                    experience: '0-0 years',
                    posted: 'Just now',
                    description: 'Job description...',
                    responsibilities: ['Responsibility 1'],
                    requirements: ['Requirement 1'],
                    benefits: ['Benefit 1'],
                    tags: ['job'],
                    source: 'Your Portfolio',
                    url: '#',
                    companySize: '0 employees',
                    industry: 'Industry',
                    postedDate: new Date().toISOString().split('T')[0]
                  };
                  setJobsData([...jobsData, newJob]);
                }}
                className="btn-primary px-4 py-2"
              >
                Add New Job
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              {jobsData.map((job) => (
                <div key={job.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, title: e.target.value} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="text-xl font-bold w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-primary-500"
                      placeholder="Job title"
                    />
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this job?')) {
                          setJobsData(jobsData.filter(item => item.id !== job.id));
                        }
                      }}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={job.company}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, company: e.target.value} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Company name"
                    />
                    <input
                      type="text"
                      value={job.location}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, location: e.target.value} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Location"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={job.salary}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, salary: e.target.value} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Salary"
                    />
                    <input
                      type="text"
                      value={job.experience}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, experience: e.target.value} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Experience"
                    />
                    <input
                      type="text"
                      value={job.posted}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, posted: e.target.value} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Posted time"
                    />
                  </div>
                  
                  <textarea
                    value={job.description}
                    onChange={(e) => {
                      const updatedJobs = jobsData.map(item => 
                        item.id === job.id ? {...item, description: e.target.value} : item
                      );
                      setJobsData(updatedJobs);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                    rows="2"
                    placeholder="Job description"
                  ></textarea>
                  
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Responsibilities</h4>
                    <textarea
                      value={job.responsibilities.join('\n')}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, responsibilities: e.target.value.split('\n')} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="3"
                      placeholder="Enter each responsibility on a new line"
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Requirements</h4>
                    <textarea
                      value={job.requirements.join('\n')}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, requirements: e.target.value.split('\n')} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="3"
                      placeholder="Enter each requirement on a new line"
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Benefits</h4>
                    <textarea
                      value={job.benefits.join('\n')}
                      onChange={(e) => {
                        const updatedJobs = jobsData.map(item => 
                          item.id === job.id ? {...item, benefits: e.target.value.split('\n')} : item
                        );
                        setJobsData(updatedJobs);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="3"
                      placeholder="Enter each benefit on a new line"
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add tag"
                      className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const tag = e.target.value.trim();
                          if (tag && !job.tags.includes(tag)) {
                            const updatedJobs = jobsData.map(item => 
                              item.id === job.id ? {...item, tags: [...item.tags, tag]} : item
                            );
                            setJobsData(updatedJobs);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    {job.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                        {tag}
                        <button 
                          onClick={() => {
                            const updatedTags = job.tags.filter((_, i) => i !== index);
                            const updatedJobs = jobsData.map(item => 
                              item.id === job.id ? {...item, tags: updatedTags} : item
                            );
                            setJobsData(updatedJobs);
                          }}
                          className="ml-1 text-purple-600 hover:text-purple-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setActiveTab('content')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveJobs}
                className="btn-primary px-6 py-2"
              >
                Save Jobs
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'projects' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Projects</h2>
              <button 
                onClick={() => {
                  const newProject = {
                    id: Date.now(),
                    title: 'New Project',
                    description: 'Project description...',
                    technologies: ['Technology'],
                    liveUrl: '#',
                    githubUrl: '#',
                    featured: false
                  };
                  setProjectsData([...projectsData, newProject]);
                }}
                className="btn-primary px-4 py-2"
              >
                Add New Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              {projectsData.map((project) => (
                <div key={project.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const updatedProjects = projectsData.map(item => 
                          item.id === project.id ? {...item, title: e.target.value} : item
                        );
                        setProjectsData(updatedProjects);
                      }}
                      className="text-xl font-bold w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-primary-500"
                      placeholder="Project title"
                    />
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this project?')) {
                          setProjectsData(projectsData.filter(item => item.id !== project.id));
                        }
                      }}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <textarea
                    value={project.description}
                    onChange={(e) => {
                      const updatedProjects = projectsData.map(item => 
                        item.id === project.id ? {...item, description: e.target.value} : item
                      );
                      setProjectsData(updatedProjects);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                    rows="3"
                    placeholder="Project description"
                  ></textarea>
                  
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add technology"
                        className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const tech = e.target.value.trim();
                            if (tech && !project.technologies.includes(tech)) {
                              const updatedProjects = projectsData.map(item => 
                                item.id === project.id ? {...item, technologies: [...item.technologies, tech]} : item
                              );
                              setProjectsData(updatedProjects);
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                          {tech}
                          <button 
                            onClick={() => {
                              const updatedTechs = project.technologies.filter((_, i) => i !== index);
                              const updatedProjects = projectsData.map(item => 
                                item.id === project.id ? {...item, technologies: updatedTechs} : item
                              );
                              setProjectsData(updatedProjects);
                            }}
                            className="ml-1 text-purple-600 hover:text-purple-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={project.liveUrl}
                      onChange={(e) => {
                        const updatedProjects = projectsData.map(item => 
                          item.id === project.id ? {...item, liveUrl: e.target.value} : item
                        );
                        setProjectsData(updatedProjects);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Live URL"
                    />
                    <input
                      type="text"
                      value={project.githubUrl}
                      onChange={(e) => {
                        const updatedProjects = projectsData.map(item => 
                          item.id === project.id ? {...item, githubUrl: e.target.value} : item
                        );
                        setProjectsData(updatedProjects);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="GitHub URL"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`featured-${project.id}`}
                      checked={project.featured}
                      onChange={(e) => {
                        const updatedProjects = projectsData.map(item => 
                          item.id === project.id ? {...item, featured: e.target.checked} : item
                        );
                        setProjectsData(updatedProjects);
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`featured-${project.id}`}>Featured Project</label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setActiveTab('content')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProjects}
                className="btn-primary px-6 py-2"
              >
                Save Projects
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">System Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4">Account Security</h3>
                <p className="text-gray-600 mb-4">
                  Update your password and security settings.
                </p>
                <button className="btn-secondary px-4 py-2">
                  Change Password
                </button>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4">Email Notifications</h3>
                <p className="text-gray-600 mb-4">
                  Configure email alerts for contact form submissions.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="email-notifications">
                    Enable email notifications
                  </label>
                </div>
              </div>
              
              <div className="card p-6 md:col-span-2">
                <h3 className="text-lg font-bold mb-4">Theme Settings</h3>
                <p className="text-gray-600 mb-4">
                  Customize the appearance of your portfolio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-primary-500 rounded-lg p-4 cursor-pointer">
                    <div className="bg-gradient-to-r from-primary-500 to-purple-600 h-8 rounded mb-2"></div>
                    <p className="font-medium">Professional Blue</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="bg-gradient-to-r from-teal-500 to-green-600 h-8 rounded mb-2"></div>
                    <p className="font-medium">Teal Green</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-8 rounded mb-2"></div>
                    <p className="font-medium">Sunset Orange</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsDashboard;