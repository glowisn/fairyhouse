import { use, useEffect, useState } from "react";

import testFetch from "@/apis/test";

export default function Page() {
  return (
    <>
      <h1>Initial Page</h1>
      <h3>TC</h3>
      <TestComponent />
    </>
  );
}

function TestComponent() {
  const [data, setData] = useState<{ data: string | null; id: number }[]>([]);
  // set data from testFetch
  useEffect(() => {
    testFetch().then((res) => {
      setData(res);
    });
  }, []);

  console.log(data);

  const list = data.map((item) => {
    return <li key={item.id}>{item.data}</li>;
  });

  return <>{list}</>;
}
