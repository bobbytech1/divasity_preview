import { Link } from "react-router-dom";
import { TabHeader } from "../../components/Header/TabHeader";
import { Bell, Bitcoin, ChevronRight, FolderOpen } from "lucide-react";
import Slider from "react-slick";
import { images } from '../../constants';

const projects = [
  { id: 1, title: "Smart Home System", description: "For making life easier", image: `${images.Product}`, level: "80" },
  { id: 2, title: "Agro Marker", description: "Connecting farmers", image: `${images.Product}`, level: "45" },
  { id: 3, title: "Artisans Meetup", description: "Local jobs, global reach", image: `${images.Product}`, level: "20" },
];

const recommendations = [
  { id: 1, title: "Mentor: Sarah Jones", description: "Expert in AI & Robotics", image: `${images.Logo}` },
  { id: 2, title: "Investor: David Li", description: "Funding early-stage tech", image: `${images.Logo}` },
  { id: 3, title: "Advisor: Anita Bello", description: "Legal advisor for startups", image: `${images.Logo}` },
];

function ProjectCard({ title, description, image, level }: { title: string; description: string; image: string; level: string }) {
  return (
    <div className="bg-purple-100 rounded-xl shadow-md w-64 mr-4">
      <img src={image} alt={title} className="w-full h-36 object-cover rounded-t-xl" />
      <div className='p-4'>
        <h3 className="font-poppins text-[18px] font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <div className="pt-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5 pb-1">
            <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${level}%` }} />
          </div>
          <p className="text-xs text-gray-500 pt-1 font-opensans">In Funding</p>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <div className="bg-purple-100 rounded-xl py-15 shadow-md  w-64 p-4 pr-4 flex flex-col items-center text-center">
      <img src={image} alt={title} className="w-50 h-50 rounded-full object-cover pb-3" />
      <h4 className="font-semibold text-[16px]">{title}</h4>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}

export function Dashboard() {
  const stats = [
    { icon: <Bitcoin size={30} />, amount: "Ξ 4,500", label: "Total Raised" },
    { icon: <FolderOpen size={30} />, amount: "3", label: "Live Projects" },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1480, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 1.5 } },
    ],
  };

  return (
    <div>
      <TabHeader name="Dashboard" containerStyle="flex-row-reverse bg-white" icon={<Bell />} />
      <div className="bg-white pt-18 px-5">
        <h2 className="font-poppins text-[22px] font-medium">Welcome back, Engr 👋</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1 py-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-purple-100 px-4 py-4 rounded-[5px]">
              <div className="bg-neutral-100 rounded-full w-fit p-2 mb-2">{stat.icon}</div>
              <p className="font-poppins text-[20px] font-medium py-2">{stat.amount}</p>
              <p className="text-[20px] font-medium font-opensans">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Your Projects */}
        <div className="py-4">
          <Link to="/projects" className="flex justify-between items-center">
            <span className="font-poppins text-[22px] font-medium">Your Projects</span>
            <ChevronRight />
          </Link>
          <div className="pt-4">
            <Slider {...sliderSettings}>
              {projects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </Slider>
          </div>
        </div>

        {/* Recommended for You */}
        <div className="pt-4 pb-30">
          <h2 className="font-poppins text-[22px] font-medium pb-4">Recommended for You</h2>
          <Slider {...sliderSettings}>
            {recommendations.map(profile => (
              <RecommendationCard key={profile.id} {...profile} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
