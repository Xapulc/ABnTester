export interface CalculateTwoSampleBinaryRequest {
  alpha: number,
  beta: number,
  p: number,
  mde: number,
  alternative: string,
  leftProportion: number,
}

export interface CalculateTwoSampleNonBinaryRequest {
  alpha: number,
  beta: number,
  variance: number,
  mde: number,
  alternative: string,
  leftProportion: number,
}

export interface CalculateTwoSampleResponse {
  leftSampleSize: number,
  rightSampleSize: number,
}
