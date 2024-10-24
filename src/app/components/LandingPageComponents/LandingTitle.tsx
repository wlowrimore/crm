import Image from "next/image";
import SiteLogo from "../../../../public/logos/zen-data.webp";

const LandingTitle = () => {
  return (
    <div className="">
      <Image
        src={SiteLogo}
        alt="Zen Data"
        width={425}
        height={425}
        className=""
        priority
      />
    </div>
  );
};

export default LandingTitle;
