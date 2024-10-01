import express, { Request, Response } from 'express'
import { json } from "body-parser";
import cors from "cors";

import router from './api/router';

const app = express()

app.use(cors())
app.use(json())
app.use(router)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });

