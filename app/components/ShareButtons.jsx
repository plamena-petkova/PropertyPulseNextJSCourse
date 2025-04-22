"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 classNames="text-xl font-bold text-center pt-2">
        Share this Project
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property?.type.replace(/\s/g, "")}`}
          forRent
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
      </div>
    </>
  );
};

export default ShareButton;
