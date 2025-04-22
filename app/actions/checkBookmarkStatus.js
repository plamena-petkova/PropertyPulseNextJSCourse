import connectDB from "@/config/database";
import { getSessionUser } from "../utils/getSessionUser";
import User from "@/models/User";

async function checkBookmarkStatus(propertyId) {
    await connectDB();

    const sessionUser = await getSessionUser();
  
    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User Id is required!");
    }
  
    const { userId } = sessionUser;
  
    const user = await User.findById(userId);
  
    let isBookmarked = user.bookmarks.includes(propertyId);

  
    return { isBookmarked };
}

export default checkBookmarkStatus;