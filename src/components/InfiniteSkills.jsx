import React from 'react';
import { Code, Database, Server, Globe, Cpu, Zap, Shield, Leaf, GitBranch, Github, Terminal } from 'lucide-react';

const InfiniteSkills = () => {
  const skills = [
    { name: "C", icon: <Terminal size={24} />, color: "text-blue-400" },
    { name: "C++", icon: <Code size={24} />, color: "text-blue-600" },
    { name: "Java", icon: <Code size={24} />, color: "text-orange-500" },
    { name: "Python", icon: <Cpu size={24} />, color: "text-yellow-500" },
    { name: "Spring Boot", icon: <Leaf size={24} />, color: "text-green-600" },
    { name: "Node.js", icon: <Server size={24} />, color: "text-green-500" },
    { name: "REST APIs", icon: <Shield size={24} />, color: "text-blue-400" },
    { name: "React.js", icon: <Globe size={24} />, color: "text-cyan-500" },
    { name: "MySQL", icon: <Database size={24} />, color: "text-blue-500" },
    { name: "MongoDB", icon: <Database size={24} />, color: "text-green-600" },
    { name: "PL/SQL", icon: <Database size={24} />, color: "text-red-500" },
    { name: "JDBC", icon: <Zap size={24} />, color: "text-yellow-600" },
    { name: "Docker", icon: <Shield size={24} />, color: "text-blue-400" },
    { name: "Kubernetes", icon: <Shield size={24} />, color: "text-blue-600" },
    { name: "AWS", icon: <Globe size={24} />, color: "text-orange-400" },
    { name: "Git", icon: <GitBranch size={24} />, color: "text-orange-600" },
    { name: "Linux", icon: <Terminal size={24} />, color: "text-black" }
  ];

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="py-8 bg-gradient-to-r from-primary-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Technical Skills</h2>
        
        <div className="relative rounded-2xl overflow-hidden border border-primary-100 shadow-inner">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-purple-50 to-transparent z-10"></div>
          
          <div className="infinite-scroll py-6">
            {duplicatedSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${index}`} 
                className="flex flex-col items-center mx-6 my-4 px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 shine-effect border border-gray-200"
              >
                <div className={`${skill.color} mb-2`}>
                  {skill.icon}
                </div>
                <span className="font-medium text-gray-800">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteSkills;