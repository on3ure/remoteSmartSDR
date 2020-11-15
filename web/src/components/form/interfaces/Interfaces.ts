export interface HomepageFormValues {
  frequency: number,
  frequencyShift: number,
}

export interface HomepageValidateValues {
  frequency: number,
  frequencyShift?: number,
}

export interface SettingsFormValues {
  smartSDRip: string,
  smartSDRport: string,
  pttDelay: number|undefined,
}

export interface SettingsValidateValues {
  smartSDRip?: string,
  smartSDRport?: string,
}
