export interface CalculateTwoSampleBinaryRequest {
  alpha: number,
  beta: number,
  p: number,
  mde: number,
  alternative: number,
  leftProportion: number,
}

export interface CalculateTwoSampleResponse {
  leftSampleSize: number,
  rightSampleSize: number,
}
