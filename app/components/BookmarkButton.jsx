"use client";

import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import bookmarkProperty from "../actions/bookmarkProperty";
import { useEffect, useState } from "react";
import checkBookmarkStatus from "../actions/checkBookmarkStatus";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You should log in!");
      return;
    }

    useEffect(() => {
      if(!userId) {
        setIsLoading(false);
        return;
      }

      checkBookmarkStatus(property._id).then((res) => {
        if(res.error) toast.error(res.error);
        if(res.isBookmarked) setIsBookmarked(res.isBookmarked);
        setIsLoading(false);
      })

    }, [property._id, userId, checkBookmarkStatus])

    bookmarkProperty(property._id).then((res) => {
      if (res.error) {
        return toast.error(res.error);
      }
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
