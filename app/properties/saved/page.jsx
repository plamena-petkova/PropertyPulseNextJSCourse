import PropertyCard from "@/app/components/PropertyCard";
import { getSessionUser } from "@/app/utils/getSessionUser";
import connectDB from "@/config/database";
import User from "@/models/User";

const SavedPropertyPage = async () => {
    await connectDB();

    const sessionUser = await getSessionUser();
  
    if (!sessionUser.user || !sessionUser.userId) {
      throw new Error("User Id is required");
    }
  
    const { userId } = sessionUser;
  //const bookmarks = user.bookmarks;

  const user = await User.findById(userId);
  const bookmarks = user.bookmarks;



  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No Saved Properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertyPage;
