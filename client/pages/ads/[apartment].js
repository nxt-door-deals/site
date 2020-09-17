import { useRouter } from "next/router";

const Ads = () => {
  const router = useRouter();
  const { apartment } = router.query;
  return (
    <div className="font-axiform text-lg p-10">
      Ads for <span className="font-bold text-brand-purple">{apartment}</span> will go here{" "}
    </div>
  );
};

export default Ads;
