import Property from "@/models/Property";
import PropertyCard from "../components/PropertyCard";
import connectDB from "@/config/database";

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.lenght === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 mdLgrid-cols-3 gap-6">
            {properties.map(property => <PropertyCard key={property._id} property={property}/>)}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
