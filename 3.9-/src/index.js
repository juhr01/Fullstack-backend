import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
const { response } = require('express')
const express = require('express')
const nodemon = require('nodemon')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>
)
