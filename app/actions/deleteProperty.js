"use server";

import Property from "@/models/Property";
import { getSessionUser } from "../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required!");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property Not Found!");
  }
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  //Extract Public Id from image URLS

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  //Delete images from cloudinary
  if (publicIds.lenght > 0) {
    for (let publicId of publicIds) {
      cloudinary.uploader
        .destroy("propertypulse/" + publicId)
        .then((result) => console.log(result));
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
