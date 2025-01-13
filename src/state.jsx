import { useEffect, useState } from "react";

export const State = () => {

    const [data, setData] = useState(10);
    // let value = 0;
    const handleButtonClick = () => {
        setData(data + 1);
    };
    // console.log(data);
    
    // useeffect(callback function, dependency-array(optional))

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Simulating an API request
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      // Simulating a delay or error condition
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Parse the JSON response
      const result = await response.json();
      setApiData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Dummy API URL for simulation
    // side effect
    fetchData();
  },[data]); // Empty dependency array means it runs only once when component mounts
//   1. array blank : it renders once
//   2. array dependency value : it render once and when dependency value change
//   3. not pass dependecy array: avoid

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log({apiData})

//   map
// props
// flex css
// spread operator
// destructuring
    return (
    <>
    <h1>{data}</h1>
    <div></div>
    <button onClick={handleButtonClick} style={{padding:"20px 16px"}}>Increment</button>
    {apiData.map((data, index)=>{
      const { userId, id, title, body} = data
      return(
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-around' }}>
        <div style={{display:"flex",  flexDirection:"column",gap:"6px", padding: '10px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
          <span>user Id : {userId}</span>
          <span>Id : {id}</span>
          <span>title : {title}</span>
          <span>Body : {body}</span>
        </div>
      </div>

      )
    })}
   
    </>);
};