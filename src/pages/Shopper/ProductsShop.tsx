import { useState } from 'react';
import { Header } from "../../components/Header/Header";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FormField } from "../../components/Form/Form";
import { images } from '../../constants';

const categoryData = [
  { id: 1, title: "D Fashion", image: `${images.Logo}` },
  { id: 2, title: "D Electronics", image: `${images.Logo}` },
  { id: 3, title: "D Homes", image: `${images.Logo}` },
  { id: 4, title: "D Automotive", image: `${images.Logo}` },
  { id: 5, title: "D Beauty", image: `${images.Logo}` },
  { id: 6, title: "D Toys", image: `${images.Logo}` },
  { id: 7, title: "D Books", image: `${images.Logo}` },
  { id: 8, title: "D Food", image: `${images.Logo}` },
  { id: 9, title: "D Music", image: `${images.Logo}` },
  { id: 10, title: "D Technology", image: `${images.Logo}` },
  { id: 11, title: "D Real Estate", image: `${images.Logo}` },
  { id: 12, title: "D Health", image: `${images.Logo}` },
];

const itemsPerPage = 6;

export function ProductsShop() {
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
        name="Shop and Vendors"
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
