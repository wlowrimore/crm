import Image from "next/image";
import SiteLogo from "../../../../public/logos/zen-data.webp";

const LandingTitle = () => {
  return (
    <div className="px-4 flex flex-col justify-center">
      <Image
        src={SiteLogo}
        alt="Zen Data"
        width={425}
        height={425}
        className=""
        priority
      />
      <h2 className="mx-auto text-xl tracking-wider">
        Streamlined CRM For Your Business
      </h2>
    </div>
  );
};

export default LandingTitle;
