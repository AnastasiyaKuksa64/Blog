import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="post"
    speed={2}
    width={352}
    height={385}
    viewBox="0 0 352 385"
    backgroundColor="#dfd6e6"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="250" rx="3" ry="3" width="352" height="6" />
    <rect x="0" y="209" rx="3" ry="3" width="352" height="6" />
    <rect x="0" y="270" rx="3" ry="3" width="100" height="6" />
    <rect x="0" y="0" rx="16" ry="16" width="352" height="181" />
    <rect x="0" y="229" rx="3" ry="3" width="352" height="6" />
  </ContentLoader>
);

export default Skeleton;
