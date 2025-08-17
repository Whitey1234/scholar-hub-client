import React from 'react';
import Banner from '../banner/banner';
import TopScholarship from '../TopScholarship.JSX';
import RecentlyAddedScholarships from '../RecentlyAddedScholarships';
import PopularScholarships from '../PopularScholarships';
import UserStatistics from '../UserStatistics';
import UserFeedback from '../UserFeedbac';
import AboutUs from '../../Page/AboutUS';
import { Contact } from 'lucide-react';
import ContactUs from '../../Page/ContactUs';


const Home = () => {
    return (
        <div className='bg-base-200 py-4 '>

            <div className='  w-11/12 mx-auto  '>
         <Banner/> 
         <TopScholarship/>
         <RecentlyAddedScholarships/>
         <PopularScholarships/>
         <UserStatistics/>
         <UserFeedback/>
         <AboutUs/>
         <ContactUs/>
        </div>
            
        </div>
        
    );
};

export default Home;