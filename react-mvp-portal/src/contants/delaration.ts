export enum DeclarationSymptoms {
  COUGH = "COUGH",
  SMELL = "SMELL",
  FEVER = "FEVER",
  BREATHING_DIFFICULTIES = "BREATHING_DIFFICULTIES",
  BODY_ACHES = "BODY_ACHES",
  HEADACHES = "HEADACHES",
  FATIGUE = "FATIGUE",
  SORE_THROAT = "SORE_THROAT",
  DIARRHEA = "DIARRHEA",
  RUNNY_NOISE = "RUNNY_NOISE",
}

export interface IDeclarations {
  id: string;
  name: string;
  temperature: number;
  has_contact: Boolean;
  symptoms: DeclarationSymptoms[];
  createdDate?: Date;
  updatedDate?: Date;
}
