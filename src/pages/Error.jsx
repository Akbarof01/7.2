import { useRouteError } from "react-router-dom";

const Error = () => {
  const errorResponse = useRouteError();
  console.log(errorResponse);
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-4xl font-bold">Something went wrong...</h4>
    </main>
  );
};

export default Error;
