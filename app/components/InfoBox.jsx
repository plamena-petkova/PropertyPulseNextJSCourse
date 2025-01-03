import Link from "next/link";

const InfoBox = ({
  heading,
  children,
  backgrounColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo
}) => {
  return (
    <div className={` p-6 rounded-lg shadow-md ${backgrounColor}`}>
      <h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700 ${buttonInfo.backgrounColor}`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
