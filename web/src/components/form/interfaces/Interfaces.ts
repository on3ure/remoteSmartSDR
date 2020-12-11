export interface HomepageFormValues {
  SmartSDRfrequence: number,
  SmartSDRptt: number,
  frequencyShift: number,
}

export interface HomepageValidateValues {
  SmartSDRfrequence?: number,
  SmartSDRptt?: number,
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
