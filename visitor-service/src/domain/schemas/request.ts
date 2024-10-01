export interface IdentifyLocationsHTTPRequest {
  title: string
  body: string
}

export interface IdentifyLocationsHTTPResponse extends IdentifyLocationsHTTPRequest{
  messageUUID: string
}

export interface IdentifyLocationsServiceMessage{
  messageUUID: string
  title: string
  body: string
}