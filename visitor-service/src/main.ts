import express from 'express'
import { json } from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv'

import router from './api/router';

dotenv.config()

const SERVICE_PORT = process.env.SERVICE_PORT

const app = express()

app.use(cors())
app.use(json())
app.use(router)

app.listen(SERVICE_PORT, () => {
    console.log(`Server is running on port ${SERVICE_PORT}`);
  });

