import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabHeader } from '../../components/Header/TabHeader';
import { Bell, Star, DollarSign } from 'lucide-react';
import Slider from 'react-slick';
import ReactPaginate from 'react-paginate';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormField } from '../../components/Form/Form';

const startupData = {
  Agriculture: [
    {
      name: "AgroBoost",
      points: 85,
      valuation: "$2.1M",
      logo: "🌾",
      bio: "AgroBoost is revolutionizing crop yields with AI-powered irrigation systems."
    },
    {
      name: "FarmFresh",
      points: 78,
      valuation: "$1.8M",
      logo: "🌱",
      bio: "FarmFresh connects local farmers directly to consumers through smart logistics."
    },
    {
      name: "GreenGrow",
      points: 82,
      valuation: "$2.5M",
      logo: "🌽",
      bio: "GreenGrow develops organic solutions to enhance sustainable agriculture practices."
    },
  ],
  Biotech: [
    {
      name: "BioNova",
      points: 92,
      valuation: "$3.4M",
      logo: "🧬",
      bio: "BioNova pioneers gene-editing technology to fight rare genetic disorders."
    },
    {
      name: "GeneCare",
      points: 88,
      valuation: "$2.9M",
      logo: "🧪",
      bio: "GeneCare creates personalized medicine solutions based on DNA sequencing."
    },
    {
      name: "CellLogic",
      points: 90,
      valuation: "$3.8M",
      logo: "🔬",
      bio: "CellLogic is advancing cell therapy platforms for next-gen regenerative medicine."
    },
  ],
  Finance: [
    {
      name: "FinMate",
      points: 80,
      valuation: "$4.5M",
      logo: "💳",
      bio: "FinMate offers AI-driven budgeting and savings tools for individuals and SMEs."
    },
    {
      name: "InvestIQ",
      points: 76,
      valuation: "$3.2M",
      logo: "📊",
      bio: "InvestIQ simplifies investing for beginners with data-driven recommendations."
    },
    {
      name: "MoneyMind",
      points: 85,
      valuation: "$4.9M",
      logo: "💰",
      bio: "MoneyMind empowers users to make smarter financial decisions with real-time analytics."
    },
  ],
  Healthcare: [
    {
      name: "MediLink",
      points: 90,
      valuation: "$5.1M",
      logo: "🏥",
      bio: "MediLink bridges patients and healthcare providers through a secure telehealth platform."
    },
    {
      name: "CareSync",
      points: 87,
      valuation: "$4.0M",
      logo: "💊",
      bio: "CareSync automates patient data syncing for improved hospital management."
    },
    {
      name: "HealthTrack",
      points: 89,
      valuation: "$4.7M",
      logo: "🩺",
      bio: "HealthTrack monitors chronic conditions remotely to ensure proactive healthcare."
    },
  ],
  EdTech: [
    {
      name: "LearnLoop",
      points: 84,
      valuation: "$2.9M",
      logo: "📚",
      bio: "LearnLoop enhances virtual classrooms with interactive AI tutors."
    },
    {
      name: "EduWave",
      points: 86,
      valuation: "$3.3M",
      logo: "🎓",
      bio: "EduWave delivers adaptive learning platforms for K-12 and university students."
    },
  ],
  Energy: [
    {
      name: "SolarEdge",
      points: 91,
      valuation: "$6.0M",
      logo: "🔋",
      bio: "SolarEdge creates smart solar solutions for efficient and affordable energy."
    },
    {
      name: "EcoPower",
      points: 89,
      valuation: "$5.5M",
      logo: "⚡",
      bio: "EcoPower develops green energy infrastructure for urban and rural communities."
    },
  ],
  Retail: [
    {
      name: "ShopEase",
      points: 77,
      valuation: "$3.1M",
      logo: "🛍️",
      bio: "ShopEase personalizes online shopping experiences using behavior-based AI."
    },
    {
      name: "QuickMart",
      points: 75,
      valuation: "$2.6M",
      logo: "🏪",
      bio: "QuickMart offers fast, no-contact delivery through autonomous microstores."
    },
  ],
  Transportation: [
    {
      name: "MoveSwift",
      points: 82,
      valuation: "$3.9M",
      logo: "🚗",
      bio: "MoveSwift provides electric fleet management and route optimization tools."
    },
    {
      name: "TransTrack",
      points: 80,
      valuation: "$3.4M",
      logo: "🚛",
      bio: "TransTrack tracks logistics performance using blockchain and IoT devices."
    },
  ]
};

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
};

const industriesPerPage = 4;

type Startup = {
  name: string;
  points: number;
  valuation: string;
  logo: string;
  bio: string;
};

export function Startup() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const handleCardClick = (startup: Startup, industry: string) => {
    const queryParams = new URLSearchParams({
      name: startup.name,
      points: startup.points.toString(),
      valuation: startup.valuation,
      logo: startup.logo,
      bio: startup.bio,
      industry,
    }).toString();
    navigate(`/startup-details?${queryParams}`);
  };

  const allIndustries = Object.entries(startupData);

  const filteredEntries = search
    ? allIndustries.filter(([industry, startups]) =>
        industry.toLowerCase().includes(search.toLowerCase()) ||
        startups.some(startup =>
          startup.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    : allIndustries.slice(
        pageNumber * industriesPerPage,
        (pageNumber + 1) * industriesPerPage
      );

  const filteredStartups = search
    ? allIndustries.flatMap(([industry, startups]) =>
        startups.filter(startup =>
          startup.name.toLowerCase().includes(search.toLowerCase()) ||
          industry.toLowerCase().includes(search.toLowerCase())
        ).map(startup => ({ ...startup, industry }))
      )
    : [];

  return (
    <div>
      <TabHeader name="Startup" containerStyle="flex-row-reverse bg-white" icon={<Bell />} />
      <div className="bg-white pt-18 px-5">
        <div className="pb-6">
          <FormField
            name="search"
            type="text"
            placeholder="Search startup"
            value={search}
            handleChange={setSearch}
            containerStyles=""
            inputStyles="border-gray-100 focus-within:border-dpurple"
          />
        </div>

        {search ? (
          <div className="pb-8">
            <h2 className="text-lg font-semibold font-poppins text-gray-700 pb-3">Search Results</h2>
            {filteredStartups.length > 0 ? (
              <Slider {...sliderSettings}>
                {filteredStartups.map((startup, index) => (
                  <div
                    key={index}
                    className="px-2 cursor-pointer"
                    onClick={() => handleCardClick(startup, startup.industry)}
                  >
                    <div className="bg-gray-100 rounded-xl p-4 shadow-sm h-40 flex flex-col justify-between">
                      <div className="text-2xl">{startup.logo}</div>
                      <div className="text-md font-semibold text-gray-800">{startup.name}</div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={14} /> {startup.points} pts
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} /> {startup.valuation}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p className="text-sm font-poppins text-gray-500">No startups found.</p>
            )}
          </div>
        ) : (
          <>
            {filteredEntries.map(([industry, startups]) => (
              <div key={industry} className="pb-8">
                <h2 className="text-lg font-poppins font-semibold text-gray-700 pb-3">{industry}</h2>
                <Slider {...sliderSettings}>
                  {startups.map((startup, index) => (
                    <div
                      key={index}
                      className="px-2 cursor-pointer"
                      onClick={() => handleCardClick(startup, industry)}
                    >
                      <div className="bg-purple-100 rounded-xl p-4 shadow-sm h-40 flex flex-col justify-between">
                        <div className="text-2xl">{startup.logo}</div>
                        <div className="text-md font-semibold font-opensans text-gray-800">{startup.name}</div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star size={14} /> <span className='font-opensans'>{startup.points} pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign size={14} /> <span className='font-opensans'>{startup.valuation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ))}
            <div className='pb-30'>
              <ReactPaginate
                previousLabel={'←'}
                nextLabel={'→'}
                pageCount={Math.ceil(allIndustries.length / industriesPerPage)}
                onPageChange={handlePageClick}
                containerClassName={'flex justify-center gap-2 mt-6'}
                activeClassName={'text-dpurple font-semibold underline'}
                pageLinkClassName={'px-3 py-1 rounded'}
                previousLinkClassName={'px-3 py-1 rounded'}
                nextLinkClassName={'px-3 py-1 rounded'}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
