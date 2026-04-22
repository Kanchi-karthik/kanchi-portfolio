import React, { useState } from 'react';
import { X, User, FileText, Settings, Save, Eye, EyeOff } from 'lucide-react';

const AdminPanel = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: 'KANCHI KARTHIK',
    title: 'Computer Science Engineer',
    email: 'kanchikarthik27798@gmail.com',
    phone: '+91 9398589498',
    location: 'Visakhapatnam, Andhra Pradesh',
    about: 'Passionate Computer Science Engineering student with expertise in full-stack development. Experienced in building responsive web applications using modern technologies.',
    resumeLink: '#'
  });
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real application, you would validate credentials against a backend
    if (loginData.username === 'kanchikarthik27798@gmail.com' && loginData.password === 'Kartk@30') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
  
  // Handle profile save
  const handleSaveProfile = () => {
    onSave(profileData);
    alert('Profile data saved successfully!');
  };
  
  // Handle input changes
  const handleInputChange = (section, field, value) => {
    if (section === 'profile') {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoggedIn ? 'Admin Dashboard' : 'Admin Login'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        
        {!isLoggedIn ? (
          // Login Form
          <div className="p-8">
            <form onSubmit={handleLogin} className="max-w-md mx-auto">
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
        ) : (
          // Admin Dashboard
          <>
            {/* Tabs */}
            <div className="border-b border-gray-200">
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
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-xl font-bold mb-6">Edit Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
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
                        onChange={(e) => handleInputChange('profile', 'title', e.target.value)}
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
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
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
                        onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
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
                        onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
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
                        onChange={(e) => handleInputChange('profile', 'about', e.target.value)}
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
                        onChange={(e) => handleInputChange('profile', 'resumeLink', e.target.value)}
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
              )}
              
              {activeTab === 'content' && (
                <div>
                  <h3 className="text-xl font-bold mb-6">Manage Content</h3>
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h4 className="text-lg font-bold mb-4">News & Updates</h4>
                      <p className="text-gray-600 mb-4">
                        Manage your news articles, project updates, and announcements.
                      </p>
                      <button className="btn-secondary px-4 py-2">
                        Edit News Content
                      </button>
                    </div>
                    
                    <div className="card p-6">
                      <h4 className="text-lg font-bold mb-4">Job Opportunities</h4>
                      <p className="text-gray-600 mb-4">
                        Add or update job listings and career opportunities.
                      </p>
                      <button className="btn-secondary px-4 py-2">
                        Manage Job Listings
                      </button>
                    </div>
                    
                    <div className="card p-6">
                      <h4 className="text-lg font-bold mb-4">Projects</h4>
                      <p className="text-gray-600 mb-4">
                        Update your featured projects and portfolio items.
                      </p>
                      <button className="btn-secondary px-4 py-2">
                        Edit Projects
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-xl font-bold mb-6">System Settings</h3>
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h4 className="text-lg font-bold mb-4">Account Security</h4>
                      <p className="text-gray-600 mb-4">
                        Update your password and security settings.
                      </p>
                      <button className="btn-secondary px-4 py-2">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="card p-6">
                      <h4 className="text-lg font-bold mb-4">Email Notifications</h4>
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
                    
                    <div className="card p-6">
                      <h4 className="text-lg font-bold mb-4">Theme Settings</h4>
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
            
            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm">
                  Logged in as: {profileData.email}
                </p>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;