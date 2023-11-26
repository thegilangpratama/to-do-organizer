import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from "react-spinners/ScaleLoader";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired page
    router.push('/auth/signin');
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <Loading
        height={72}
        width={8}
        radius={16}
        margin={4}
        color="rgb(245 158 11)"
      />
    </div>
  );
};

export default IndexPage;
