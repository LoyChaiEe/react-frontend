import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
const getter = (url) => axios.get(url).then((res) => res.data);

export default function Test() {
  const [numbers, setNumbers] = useState([]);
  const {
    data: getExp,
    error: getErrorExp,
    mutate: refetchGetExp,
  } = useSWR("http://localhost:8080/get", getter);
  const {
    data: postExp,
    error: postErrorExp,
    mutate: refetchPostExp,
  } = useSWR("http://localhost:8080/post", (url) =>
    axios.post(url, { data: [69,72] }).then((res) => res.data)
  );
  const {
    data: getFla,
    error: getErrorFla,
    mutate: refetchGetFla,
  } = useSWR("http://localhost:5000/get", getter);
  const {
    data: postFla,
    error: postErrorFla,
    mutate: refetchPostFla,
  } = useSWR("http://localhost:5000/post", (url) =>
    axios.post(url, { data: numbers }).then((res) => res.data)
  );
  console.log(getFla);
  const ele = numbers?.map((num) => <button>{num}</button>);

  const getExpress = () => {
    refetchGetExp();
    setNumbers(getExp.arr);
  };
  const postExpress = () => {
    refetchPostExp();
    setNumbers(postExp.arr);
  };
  const getFlask = () => {
    refetchGetFla();
    setNumbers(getFla.arr);
  };
  const postFlask = () => {
    refetchPostFla();
    setNumbers(postFla.arr);
  };
  console.log(numbers)

  return (
    <>
      {ele}
      <button onClick={getExpress}>GET: Express</button>
      <button onClick={postExpress}>POST: Express</button>
      <button onClick={getFlask}>GET: Flask</button>
      <button onClick={postFlask}>POST: Flask</button>
    </>
  );
}
