export interface HomepageFormValues {
  SmartSDRfrequency: string,
  SmartSDRfrequencyShift: string,
  SmartSDRptt: string,
}

export interface HomepageValidateValues {
  SmartSDRfrequency?: string,
  frequencyShift?: string,
  SmartSDRptt?: string,
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
