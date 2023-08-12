import React, { useEffect } from "react";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
];

const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "13+ years old",
    value: "12-20",
  },
];



const Filters = ({ showFilters, setShowFilters, filters, setFilters, getData }) => {

  useEffect(()=>{
      getData()
  }, [filters])


  return (
    <div className="w-72 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-orange-900 text-xl">Filters</h1>

        <i
          className="ri-close-line text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-600">Categories</h1>

        <div className="flex flex-col gap-1">
            {categories.map((category)=> {
                return (
                    <div className="flex items-center gap-2">
                       <input 
                     type="checkbox" 
                     name="category"
                     checked={filters.category.includes(category.value)}
                     onChange={(e) => {
                        if (e.target.checked){
                            setFilters({...filters, category : [...filters.category, category.value], })
                        } else {
                            setFilters({
                                ...filters,
                                category: filters.category.filter(
                                    (item) => item !== category.value
                                )
                            })
                        }
                        }} 
                        className="max-width"
                        />
                        <label htmlFor="category">{category.name}</label>
                    </div>
                     
                )
            })}
         
        </div>
        <h1 className="text-gray-600 mt-2">Age</h1>

        <div className="flex flex-col gap-1">
            {ages.map((age)=> {
                return (
                    <div className="flex items-center gap-2">
                       <input 
                     type="checkbox" 
                     name="age"
                     checked={filters.age.includes(age.value)}
                     onChange={(e) => {
                        if (e.target.checked){
                            setFilters({...filters, age : [...filters.age, age.value], })
                        } else {
                            setFilters({
                                ...filters,
                                age: filters.age.filter(
                                    (item) => item !== age.value
                                )
                            })
                        }
                        }} 
                        className="max-width"
                        />
                        <label htmlFor="category">{age.name}</label>
                    </div>
                     
                )
            })}
         
        </div>
      </div>
    </div>
  );
};

export default Filters;
