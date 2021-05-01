import { useEffect } from 'react';

import { httpGet } from 'networking/http';
import { DEFAULT } from 'networking/endpoints';

function Home() {
  useEffect(() => {
    httpGet(DEFAULT).then(res => console.log('response:', res.data));
  }, []);
  return <h1>Hello World</h1>;
}

export default Home;
