import PageNotFound from "../components/utils/PageNotFound";
import NotFoundHeadLayout from "../components/layout/NotFoundHeadLayout";

const Custom404 = () => {
  return (
    <NotFoundHeadLayout>
      <div className="pl-5 pr-5">
        <PageNotFound />
      </div>
    </NotFoundHeadLayout>
  );
};

export default Custom404;
