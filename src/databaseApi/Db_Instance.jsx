import React from 'react';
import axios from 'axios';

const Db_Instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`
});

export default Db_Instance;
