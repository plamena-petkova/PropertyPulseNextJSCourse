import BookmarkButton from "@/app/components/BookmarkButton";
import PropertyContactForm from "@/app/components/PropertyContactForm";
import PropertyDetails from "@/app/components/PropertyDetails";
import PropertyHeaderImage from "@/app/components/PropertyHeaderImage";
import PropertyImages from "@/app/components/PropertyImages";
import ShareButton from "@/app/components/ShareButtons";
import { convertToSerializableObject } from "@/app/utils/convertToObject";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  await connectDB();

  const { id } = await params; 

  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section>{property.name}</section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* Property info */}
            <PropertyDetails property={property} />
            <aside className="space-y-4">
            <BookmarkButton property={property} />
            <ShareButton property={property}/>
            <PropertyContactForm property={property}/>
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
