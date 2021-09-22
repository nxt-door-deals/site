import PageNotFound from "../components/page_components/common/PageNotFound";
import NotFoundHeadLayout from "../components/layout/head/NotFoundHeadLayout";

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
