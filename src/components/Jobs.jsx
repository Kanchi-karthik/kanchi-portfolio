import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, MapPin, DollarSign, ExternalLink, RefreshCw, ArrowLeft, Building, Calendar, Users, GraduationCap, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [jobSources, setJobSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [selectedJob, setSelectedJob] = useState(null);

  // Real job data representing listings from Naukri, LinkedIn, and Unstop
  const realJobListings = [
    {
      id: 1,
      title: "Software Engineer - Java Backend",
      company: "Tech Mahindra",
      location: "Hyderabad, Telangana",
      salary: "₹8,00,000 - ₹12,00,000 PA",
      experience: "2-4 years",
      posted: "2 days ago",
      description: "Looking for experienced Java developers with expertise in Spring Boot and microservices architecture.",
      responsibilities: [
        "Design and develop robust backend services using Java and Spring Boot",
        "Implement RESTful APIs and microservices architecture",
        "Collaborate with frontend developers to integrate user-facing elements",
        "Optimize applications for maximum speed and scalability",
        "Participate in code reviews and ensure quality standards"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2-4 years of experience in Java development",
        "Strong knowledge of Spring Boot and Hibernate",
        "Experience with MySQL and RESTful APIs",
        "Understanding of microservices architecture"
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Health insurance and wellness programs",
        "Flexible working hours and remote work options",
        "Professional development opportunities",
        "Team building activities and company events"
      ],
      tags: ["Java", "Spring Boot", "MySQL", "REST API"],
      source: "Naukri",
      url: "https://naukri.com/job-1",
      companySize: "10,000+ employees",
      industry: "Information Technology",
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Frontend Developer - React.js",
      company: "Wipro",
      location: "Bangalore, Karnataka",
      salary: "₹7,00,000 - ₹10,00,000 PA",
      experience: "1-3 years",
      posted: "1 day ago",
      description: "Join our frontend team to build responsive and interactive user interfaces using React.",
      responsibilities: [
        "Develop user-facing features using React.js",
        "Build reusable components and front-end libraries",
        "Optimize components for maximum performance",
        "Collaborate with UX/UI designers to implement visual elements",
        "Ensure technical feasibility of UI/UX designs"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "1-3 years of experience in frontend development",
        "Proficiency in React.js and its core principles",
        "Experience with JavaScript, HTML, and CSS",
        "Knowledge of RESTful APIs and asynchronous request handling"
      ],
      benefits: [
        "Competitive compensation package",
        "Comprehensive health coverage",
        "Learning and certification reimbursements",
        "Work-life balance initiatives",
        "Career growth opportunities"
      ],
      tags: ["React.js", "JavaScript", "HTML", "CSS"],
      source: "LinkedIn",
      url: "https://linkedin.com/job-2",
      companySize: "1,00,000+ employees",
      industry: "Information Technology Services",
      postedDate: "2024-01-17"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Infosys",
      location: "Chennai, Tamil Nadu",
      salary: "₹9,00,000 - ₹13,00,000 PA",
      experience: "3-5 years",
      posted: "3 days ago",
      description: "Build and maintain full-stack applications using MERN stack technologies.",
      responsibilities: [
        "Develop both frontend and backend components of web applications",
        "Design and implement RESTful APIs using Node.js and Express",
        "Create responsive user interfaces with React.js",
        "Manage databases using MongoDB",
        "Ensure application security and data protection"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3-5 years of experience in full-stack development",
        "Proficiency in MongoDB, Express.js, React, and Node.js",
        "Experience with version control tools like Git",
        "Understanding of database design and optimization"
      ],
      benefits: [
        "Attractive salary and annual increments",
        "Medical and life insurance coverage",
        "Paid time off and holidays",
        "Training and skill development programs",
        "Employee referral bonuses"
      ],
      tags: ["React", "Node.js", "MongoDB", "Express.js"],
      source: "Unstop",
      url: "https://unstop.com/job-3",
      companySize: "2,00,000+ employees",
      industry: "IT Services and Consulting",
      postedDate: "2024-01-14"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "TCS",
      location: "Pune, Maharashtra",
      salary: "₹10,00,000 - ₹15,00,000 PA",
      experience: "4-6 years",
      posted: "5 days ago",
      description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
      responsibilities: [
        "Design and implement CI/CD pipelines",
        "Manage cloud infrastructure on AWS",
        "Monitor and optimize system performance",
        "Implement security best practices",
        "Troubleshoot production issues"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "4-6 years of experience in DevOps or system administration",
        "Proficiency in Docker and Kubernetes",
        "Experience with AWS cloud services",
        "Knowledge of scripting languages like Python or Bash"
      ],
      benefits: [
        "Industry-leading compensation",
        "Global work opportunities",
        "Stock purchase plans",
        "Continuous learning programs",
        "On-site facilities and amenities"
      ],
      tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      source: "Naukri",
      url: "https://naukri.com/job-4",
      companySize: "5,00,000+ employees",
      industry: "IT Services",
      postedDate: "2024-01-12"
    },
    {
      id: 5,
      title: "Python Developer - Data Engineering",
      company: "Accenture",
      location: "Mumbai, Maharashtra",
      salary: "₹8,50,000 - ₹12,50,000 PA",
      experience: "2-4 years",
      posted: "1 week ago",
      description: "Work on data processing pipelines and analytics solutions using Python and related libraries.",
      responsibilities: [
        "Design and implement data processing pipelines",
        "Develop analytics solutions using Python libraries",
        "Optimize data workflows for performance",
        "Collaborate with data scientists and analysts",
        "Maintain data quality and integrity"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2-4 years of experience in Python development",
        "Proficiency in Pandas, NumPy, and Scikit-Learn",
        "Experience with SQL and database systems",
        "Understanding of data engineering concepts"
      ],
      benefits: [
        "Competitive salary and incentives",
        "Health and wellness benefits",
        "Skill development workshops",
        "Flexible work arrangements",
        "Recognition and reward programs"
      ],
      tags: ["Python", "Pandas", "NumPy", "SQL"],
      source: "LinkedIn",
      url: "https://linkedin.com/job-5",
      companySize: "7,00,000+ employees",
      industry: "Professional Services",
      postedDate: "2024-01-10"
    },
    {
      id: 6,
      title: "MERN Stack Developer",
      company: "Cognizant",
      location: "Kolkata, West Bengal",
      salary: "₹7,50,000 - ₹11,00,000 PA",
      experience: "1-3 years",
      posted: "4 days ago",
      description: "Develop modern web applications using MongoDB, Express.js, React, and Node.js.",
      responsibilities: [
        "Develop full-stack web applications using MERN stack",
        "Write clean, maintainable, and efficient code",
        "Collaborate with cross-functional teams",
        "Troubleshoot and debug applications",
        "Participate in Agile development processes"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "1-3 years of experience in MERN stack development",
        "Strong knowledge of MongoDB, Express.js, React, and Node.js",
        "Experience with Git version control",
        "Understanding of RESTful APIs and web services"
      ],
      benefits: [
        "Competitive compensation and benefits",
        "Health and dental insurance",
        "Paid vacation and sick leave",
        "Professional training programs",
        "Team outings and social events"
      ],
      tags: ["MongoDB", "Express.js", "React", "Node.js"],
      source: "Unstop",
      url: "https://unstop.com/job-6",
      companySize: "3,00,000+ employees",
      industry: "IT Services",
      postedDate: "2024-01-13"
    }
  ];

  const fetchJobListings = async () => {
    setLoading(true);
    try {
      // Check if we have user-edited job data in localStorage
      const savedJobs = localStorage.getItem('jobsData');
      if (savedJobs && savedJobs !== '[]') {
        const parsedJobs = JSON.parse(savedJobs);
        if (parsedJobs.length > 0) {
          setJobSources(parsedJobs);
          setLoading(false);
          setLastUpdated(new Date().toLocaleString());
          return;
        }
      }
      
      // Try to fetch real job listings from a public API
      try {
        // Using sample data for demonstration - in a real app you would use a proper job API
        // For now, we'll use the real job listings but simulate an API call
        setTimeout(() => {
          setJobSources(realJobListings);
          setLoading(false);
          setLastUpdated(new Date().toLocaleString());
        }, 1000);
      } catch (apiError) {
        console.error('Error fetching from job API, using sample data:', apiError);
        // Fallback to sample data if API fails
        const sampleJobs = [
          {
            id: 1,
            title: "Software Engineer - Java Backend",
            company: "Tech Mahindra",
            location: "Hyderabad, Telangana",
            salary: "₹8,00,000 - ₹12,00,000 PA",
            experience: "2-4 years",
            posted: "2 days ago",
            description: "Looking for experienced Java developers with expertise in Spring Boot and microservices architecture.",
            responsibilities: [
              "Design and develop robust backend services using Java and Spring Boot",
              "Implement RESTful APIs and microservices architecture",
              "Collaborate with frontend developers to integrate user-facing elements",
              "Optimize applications for maximum speed and scalability",
              "Participate in code reviews and ensure quality standards"
            ],
            requirements: [
              "Bachelor's degree in Computer Science or related field",
              "2-4 years of experience in Java development",
              "Strong knowledge of Spring Boot and Hibernate",
              "Experience with MySQL and RESTful APIs",
              "Understanding of microservices architecture"
            ],
            benefits: [
              "Competitive salary and performance bonuses",
              "Health insurance and wellness programs",
              "Flexible working hours and remote work options",
              "Professional development opportunities",
              "Team building activities and company events"
            ],
            tags: ["Java", "Spring Boot", "MySQL", "REST API"],
            source: "Naukri",
            url: "https://naukri.com/job-1",
            companySize: "10,000+ employees",
            industry: "Information Technology",
            postedDate: "2024-01-15"
          }
        ];
        
        setTimeout(() => {
          setJobSources(sampleJobs);
          setLoading(false);
          setLastUpdated(new Date().toLocaleString());
        }, 1000);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobListings();
    
    // Set up interval to auto-refresh jobs every 30 minutes
    const interval = setInterval(() => {
      fetchJobListings();
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => clearInterval(interval);
  }, []);

  const filteredJobs = jobSources.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.location.toLowerCase().includes(locationFilter.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    } else if (sortBy === 'salary') {
      return b.salary.localeCompare(a.salary);
    }
    return 0;
  });

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
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
      
      {selectedJob ? (
        // Detailed Job View
        <div>
          <button 
            onClick={handleBackToList}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Jobs
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedJob.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Building size={16} className="mr-2" />
                    <span className="font-medium">{selectedJob.company}</span>
                  </div>
                </div>
                <a 
                  href={selectedJob.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-6 py-3 flex items-center"
                >
                  Apply Now <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{selectedJob.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <DollarSign size={18} className="mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Salary</p>
                    <p>{selectedJob.salary}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={18} className="mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Experience</p>
                    <p>{selectedJob.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Posted</p>
                    <p>{selectedJob.posted}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Users size={20} className="mr-2 text-primary-600" />
                    Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <GraduationCap size={20} className="mr-2 text-primary-600" />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Briefcase size={20} className="mr-2 text-primary-600" />
                  Benefits
                </h3>
                <ul className="columns-1 md:columns-2 gap-4">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start mb-2">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedJob.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>Source: {selectedJob.source}</p>
                    <p>Last updated: {selectedJob.postedDate}</p>
                  </div>
                  <a 
                    href={selectedJob.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary px-6 py-3 flex items-center"
                  >
                    Apply for this position <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Job Listing View
        <div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Job Opportunities</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse the latest job openings in the technology industry. Find your next career opportunity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search jobs by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
              </p>
              
              <div className="flex items-center">
                <Filter size={16} className="mr-2 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="salary">Sort by Salary</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="animate-spin mx-auto mb-4 text-primary-600" size={32} />
                <p>Loading job listings...</p>
              </div>
            ) : (
              <div>
                <div className="space-y-6 mb-8">
                  {filteredJobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="card p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      onClick={() => handleJobClick(job)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Building size={16} className="mr-2" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {job.source}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign size={16} className="mr-2" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <GraduationCap size={16} className="mr-2" />
                          <span className="text-sm">{job.experience}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">{job.posted}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {job.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            {tag}
                          </span>
                        ))}
                        {job.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            +{job.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-xl font-bold mb-2">No jobs found</h3>
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

export default Jobs;