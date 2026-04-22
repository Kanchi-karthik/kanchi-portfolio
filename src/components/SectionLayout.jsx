import React from 'react';

const SectionLayout = ({ title, id, children }) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;