import axios from "axios";
"https://api.nomics.com/v1/prices?key=" + process.env.NOMICS_API_KEY;

//   const NomicsApiService = () => axios.create({
//     baseURL: 'https://api.nomics.com/v1',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'}
//   })

// export default NomicsApiService

const NomicsApiService = () => {
  const axiosInstance = axios.create({
    baseURL: `https://api.nomics.com/v1/`,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return axiosInstance;
};

export default NomicsApiService;
