import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// flattens the layer of nested introduced by axios
// the cc-api responses look like { data, error }, but axios nests the whole response under 'data'
instance.interceptors.response.use(
  res => res.data,
  (err) => {
    const error = {
      ...err.response.data.error,
      ...err,
    };

    // console.error(error);
    return Promise.reject(error);
  },
);

// monkey patch for image uploads
instance.uploadImage = async function uploadImage(route, formData, options = {}) {
  let headers = { 'Content-Type': 'multipart/form-data' };

  if (options.headers) headers = { ...headers, ...options.headers };

  const opts = {
    ...options,
    headers,
  };

  return this.post(route, formData, opts);
};

export default instance;
