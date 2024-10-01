import { Request, Response } from "express"
import { HttpResponse } from "../protocols/http"

export interface Controller {
  handle(req: Request, res: Response): Promise<HttpResponse>
}