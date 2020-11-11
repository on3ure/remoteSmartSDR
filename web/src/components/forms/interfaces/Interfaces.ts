export interface HomepageFormValues {
  smartSDRip: string,
  smartSDRport: string,
  pttDelay: number|undefined,
  offset: number|undefined,
}

export interface HomepageValidateValues {
  smartSDRip?: string,
  smartSDRport?: string,
}
