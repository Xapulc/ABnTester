export interface CalculateOneSampleBinaryRequest {
  alpha: number,
  beta: number,
  p: number,
  mde: number,
  alternative: string,
}

export interface CalculateOneSampleNonBinaryRequest {
  alpha: number,
  beta: number,
  variance: number,
  mde: number,
  alternative: string,
}

export interface CalculateOneSampleResponse {
  sampleSize: number,
}

