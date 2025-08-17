import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axiosSecure from '../Hooks/useAxiosSecure';

const UserFeedback = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users and transform them into testimonials
    axiosSecure.get('/users')
      .then(res => {
        // Transform the fetched users into testimonial format
        const userTestimonials = res.data.slice(0, 3).map((user, index) => ({
          name: user.name || "Anonymous User",
          role: "Student",
          university: "Top University",
          rating: 5,
          avatar: user?.image || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 10}.jpg`,
          quote: "This platform helped me find amazing scholarship opportunities!"
        }));
        
        // Fallback to default testimonials if no users found
        const defaultTestimonials = [
          {
            name: "Sarah Johnson",
            role: "Computer Science Student",
            university: "Stanford University",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            quote: "This platform helped me secure $45,000 in scholarships!"
          },
          {
            name: "Michael Chen",
            role: "Engineering Student",
            university: "MIT",
            rating: 4,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            quote: "Found 12 relevant scholarships and won 3 of them!"
          },
          {
            name: "Priya Patel",
            role: "Medical Student",
            university: "Johns Hopkins",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            quote: "The dashboard saved me countless hours managing applications."
          }
        ];

        setTestimonials(userTestimonials.length > 0 ? userTestimonials : defaultTestimonials);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const nextTestimonial = () => {
    setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-base-100 p-8 rounded-2xl shadow-lg">
                  <div className="flex justify-center mb-6 -mt-12">
                    <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            What Our <span className="text-blue-600">Students</span> Say
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Trusted by thousands of students from top universities worldwide
          </p>
        </div>

        {/* Desktop Version - Fancy Card Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-base-100 p-8 rounded-2xl shadow-lg transform transition-all duration-500 ${activeIndex === index ? 'scale-105 border-2 border-blue-400' : 'scale-95 opacity-90'}`}
              >
                <div className="flex justify-center mb-6 -mt-12">
                  <img 
             src={testimonial?.avatar || "https://via.placeholder.com/80"} 
                 alt={testimonial?.name || "Student"}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                    onError={(e) => {
                      e.target.src = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 10}.jpg`;
                    }}
                  />
                </div>
                <div className="text-center mb-4">
                  <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : ""} />
                    ))}
                  </div>
                  <h4 className="text-xl font-bold ">{testimonial.name}</h4>
                  <p className=" text-sm">{testimonial.role} • {testimonial.university}</p>
                </div>
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-2 left-0 text-blue-200 text-3xl" />
                  <p className=" italic pl-8 mb-6">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Version - Carousel */}
        <div className="lg:hidden relative">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-center mb-6 -mt-12">
              <img 
                src={testimonials[activeIndex]?.avatar || "https://via.placeholder.com/80"} 
                alt={testimonials[activeIndex]?.name || "Student"}
                className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                onError={(e) => {
                  e.target.src = `https://randomuser.me/api/portraits/${activeIndex % 2 === 0 ? 'women' : 'men'}/${activeIndex + 10}.jpg`;
                }}
              />
            </div>
            <div className="text-center mb-4">
              <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < testimonials[activeIndex]?.rating ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <h4 className="text-lg font-bold ">{testimonials[activeIndex]?.name}</h4>
              <p className=" text-xs">{testimonials[activeIndex]?.role} • {testimonials[activeIndex]?.university}</p>
            </div>
            <div className="relative">
              <FaQuoteLeft className="absolute -top-2 left-0 text-blue-200 text-2xl" />
              <p className=" italic pl-8 mb-6 text-sm">"{testimonials[activeIndex]?.quote}"</p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-base-100 shadow-md text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-base-100 shadow-md text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        {/* <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 mb-6">Trusted by students at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_University_logo.svg/1200px-Harvard_University_logo.svg.png" alt="Harvard" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Stanford_University_wordmark_2005.svg/1200px-Stanford_University_wordmark_2005.svg.png" alt="Stanford" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png" alt="MIT" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/University_of_Toronto_Logo.svg/1200px-University_of_Toronto_Logo.svg.png" alt="University of Toronto" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/University_of_Oxford.svg/1200px-University_of_Oxford.svg.png" alt="Oxford" className="h-8" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default UserFeedback;