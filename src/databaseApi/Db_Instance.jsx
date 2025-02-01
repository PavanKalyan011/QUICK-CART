import React from 'react'
import axios from 'axios'

const Db_Instance =axios.create (
    {
    baseURL:"https://user-address-3a2b.onrender.com/"
}
)

export default Db_Instance
