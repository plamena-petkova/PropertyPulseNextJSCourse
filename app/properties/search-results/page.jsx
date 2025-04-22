import PropertyCard from "@/app/components/PropertyCard";
import PropertySearchForm from "@/app/components/PropertySearchForm";
import { convertToSerializableObject } from "@/app/utils/convertToObject";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();

  const locationPattern = new RegExp(location, "i");
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.zipcode": locationPattern },
      { "location.state": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertyQueryresults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertyQueryresults);

  console.log("Properties", properties);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-aut px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-100 hover:underline mb-3 "
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties
          </Link>
          <h1 className="text-2xl mb-4">Search results</h1>
          {properties.length === 0 ? (
            <div>No Search results found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => {
                return <PropertyCard key={property._id} property={property} />;
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
