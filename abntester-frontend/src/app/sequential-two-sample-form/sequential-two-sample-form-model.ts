export interface CalculateTwoSampleBinaryRequest {
  alpha: number,
  beta: number,
  p: number,
  mde: number,
  alternative: string,
  leftProportion: number,
}

export interface CalculateTwoSampleResponse {
  hypothesis: TwoSampleDto,
  alternative: TwoSampleDto,
  max: TwoSampleDto,
}

export interface TwoSampleDto {
  leftSampleSize: number,
  rightSampleSize: number,
}
