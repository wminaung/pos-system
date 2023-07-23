import { useEffect } from "react";
import { useRouter } from "next/router";

const Navigate = ({ to }: { to: string }) => {
  const router = useRouter();

  // Function to handle navigation to the specified path
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Navigate on component mount (you can adjust this behavior based on your use case)
  useEffect(() => {
    navigateTo(to);
  }, [to]);

  return null; // Navigate doesn't render anything, it only handles navigation
};

export default Navigate;
