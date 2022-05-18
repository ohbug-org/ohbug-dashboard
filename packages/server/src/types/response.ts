export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 4,
  REDIRECT = 9,
}

export interface ResponseStructure<R = unknown> {
  success: boolean // if request is success
  data?: R // response data
  errorCode?: number // code for errorType
  errorMessage?: string // message display to user
  showType?: ErrorShowType // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string // Convenient for back-end Troubleshooting: unique request ID
  host?: string // Convenient for backend Troubleshooting: host of current access server
}
