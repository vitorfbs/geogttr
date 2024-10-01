import { OK, CREATED, ACCEPTED, BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status";

export interface HttpResponse {
  code: number
  body: (string | object)
}

export interface HttpRequest {
  body?: any
}

export const ok = (data: any): HttpResponse => ({
    code: OK,
    body: data
})

export const created = (data: any): HttpResponse => ({
    code: CREATED,
    body: data
})


export const accepted = (data: (string | object)): HttpResponse => ({
  code: ACCEPTED,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
    code: BAD_REQUEST,
    body: error
})

export const internalServerError = (): HttpResponse => ({
  code: INTERNAL_SERVER_ERROR,
  body: "An error has ocurred. try again later."
})