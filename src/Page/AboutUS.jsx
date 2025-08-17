import { FaGraduationCap, FaHandsHelping, FaGlobeAmericas, FaAward } from 'react-icons/fa';
import { Link } from 'react-router';

const AboutUs = () => {
  // Image URLs with fallbacks
  const images = {
    students: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    team: 'https://images.unsplash.com/photo-1571260898930-8f1d3ce3b73?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    fallback: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  };

  return (
    <section className=" bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800  dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold dark:text-white text-gray-800 mb-4">
            Our <span className="text-blue-600">Mission</span> & Vision
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-800">
            Democratizing access to education through innovative scholarship solutions
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl  text-gray-800 font-bold dark:text-white mb-6">
              Bridging the Gap Between <span className="text-blue-600">Students</span> and Opportunities
            </h3>
            <p className="mb-4 text-gray-600">
              Founded in 2020, our platform began as a small initiative to help local students find scholarship opportunities. 
              Today, we've grown into a global network connecting thousands of students with educational funding from 
              top institutions worldwide.
            </p>
            <p className="mb-6 text-gray-600 ">
              What started as a simple database has evolved into an intelligent matching system that uses AI to pair students 
              with the scholarships they're most likely to win, saving them countless hours of searching and application time.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                50,000+ Students Helped
              </div>
              <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                $200M+ Awarded
              </div>
              <div className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                1,000+ Partner Institutions
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="bg-blue-500 rounded-2xl overflow-hidden shadow-xl aspect-video">
              <img 
                src={images.students} 
                alt="Students celebrating graduation"
                className="w-full h-full object-cover opacity-90"
                onError={(e) => {
                  e.target.src = images.fallback;
                  e.target.alt = "Students studying together";
                }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-base-100 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hidden md:block">
              <div className="text-5xl font-bold text-blue-600">5+</div>
              <div className="">Years of Experience</div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-800  dark:text-white mb-12">
            Our Core <span className="text-blue-600">Values</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaGraduationCap className="text-4xl text-blue-500 mb-4" />,
                title: "Educational Access",
                description: "We believe money should never be a barrier to quality education"
              },
              {
                icon: <FaHandsHelping className="text-4xl text-green-500 mb-4" />,
                title: "Student-Centric",
                description: "Every feature is designed with student needs in mind"
              },
              {
                icon: <FaGlobeAmericas className="text-4xl text-purple-500 mb-4" />,
                title: "Global Reach",
                description: "Connecting students with opportunities worldwide"
              },
              {
                icon: <FaAward className="text-4xl text-yellow-500 mb-4" />,
                title: "Excellence",
                description: "Only partnering with reputable institutions"
              }
            ].map((value, index) => (
              <div key={index} className="bg-base-100 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center">
                <div className="flex justify-center">{value.icon}</div>
                <h4 className="text-xl font-bold  dark:text-white mb-2">{value.title}</h4>
                <p className="">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-blue-100 mb-6">
                We're always looking for passionate educators, technologists, and financial aid experts 
                to help us expand access to education.
              </p>
              <Link  to={'/login'}>
              <button className="bg-base-100 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
                Explore Careers
              </button>
              </Link>
              
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-blue-400 opacity-30"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-blue-400 opacity-30"></div>
                <img 
                  src={images.team} 
                  alt="Team working together"
                  className="relative rounded-xl shadow-lg w-full max-w-md"
                  onError={(e) => {
                    e.target.src = images.fallback;
                    e.target.alt = "Team collaboration";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;