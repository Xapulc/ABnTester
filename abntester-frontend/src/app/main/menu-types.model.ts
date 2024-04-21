export interface Displayable {
  readonly key: string
  readonly displayName: string
}

export enum DesignType {
  CLASSIC = 'CLASSIC',
  SEQUENTIAL = 'SEQUENTIAL'
}

export enum SampleType {
  ONE_SAMPLE = 'ONE_SAMPLE',
  TWO_SAMPLE = 'TWO_SAMPLE'
}
