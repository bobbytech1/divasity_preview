import { useState } from 'react';
import { Header } from "../../components/Header/Header";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FormField } from "../../components/Form/Form";
import { images } from '../../constants';

const categoryData = [
  { id: 1, title: "Mechanic", image: `${images.Mechanic}` },
  { id: 2, title: "Electrician", image: `${images.Mechanic}` },
  { id: 3, title: "Interior Design", image: `${images.Mechanic}` },
  { id: 4, title: "Car Wash", image: `${images.Mechanic}` },
  { id: 5, title: "Makeup Artist", image: `${images.Mechanic}` },
  { id: 6, title: "Babysitting", image: `${images.Mechanic}` },
  { id: 7, title: "Bookkeeping", image: `${images.Mechanic}` },
  { id: 8, title: "Catering", image: `${images.Mechanic}` },
  { id: 9, title: "Music Lessons", image: `${images.Mechanic}` },
  { id: 10, title: "Tech Support", image: `${images.Mechanic}` },
  { id: 11, title: "Real Estate Agent", image: `${images.Mechanic}` },
  { id: 12, title: "Health Coach", image: `${images.Mechanic}` },
];

const itemsPerPage = 6;

export function ServicesCategory() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredCategories = categoryData.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredCategories.length / itemsPerPage);
  const startOffset = currentPage * itemsPerPage;
  const currentItems = filteredCategories.slice(startOffset, startOffset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <Header
        name="Services Category"
        containerStyle="bg-white h-[7vh]"
        handlePress={handleGoBack}
        textStyle="capitalize"
        icon={<ChevronLeft />}
      />

      <div className="p-4">
        {/* Search using custom FormField */}
        <FormField
          name="search"
          type="text"
          placeholder="Search Product Category..."
          value={search}
          handleChange={setSearch}
          containerStyles="pb-6"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.map(cat => (
            <div
              key={cat.id}
              className="relative h-40 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => navigate("/shops/services")}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-60  group-hover:opacity-20 transition duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold font-opensans">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pt-6 pb-25 flex justify-center items-center">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex items-center"
            pageClassName="px-3 py-1 border border-gray-300 rounded"
            activeClassName="bg-purple-600 text-white"
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
          />
        </div>
      </div>
    </div>
  );
}
