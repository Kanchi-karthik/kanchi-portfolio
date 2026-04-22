# KANCHI KARTHIK - Portfolio

A modern, dark-mode-first portfolio website for KANCHI KARTHIK, a Software Developer specializing in Java and MERN Stack Development.

## Features

- **Modern Dark Mode Design**: Clean, professional dark theme with light mode toggle
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Performance Optimized**: Fast loading and optimized for recruiter viewing
- **ATS-Friendly**: Structured content for Applicant Tracking Systems

## Sections

1. **Hero Section**: Name, role, value statement, and CTAs
2. **About Me**: Technical background and career focus
3. **Technical Skills**: Grouped skills with ATS-friendly presentation
4. **Featured Projects**: Showcase of key projects with descriptions
5. **Coding Profiles**: Links to GitHub, LeetCode, HackerRank
6. **Education & Experience**: Timeline of academic and professional history
7. **Achievements**: Recognition and accomplishments
8. **Resume**: Downloadable resume section
9. **Contact**: Form and contact information
10. **Footer**: Copyright and theme toggle

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter and JetBrains Mono
- **Deployment**: Vercel or Netlify ready

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Profiles.jsx
│   │   ├── Education.jsx
│   │   ├── Achievements.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── resume.pdf
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Customization

To customize the portfolio for your own use:

1. Update the content in each component file
2. Replace placeholder images with actual images
3. Update contact information and social links
4. Modify the color scheme in `tailwind.config.js` if desired
5. Add your own projects and achievements

## Deployment

This portfolio is ready for deployment on Vercel or Netlify. Simply connect your repository and deploy!

## License

This project is open source and available under the MIT License.