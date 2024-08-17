
export type Food = {
    id: number;
    name: string;
    calories: number;
    cholesterol: number;
  };

export type ApiResponse = {
    food: Food | undefined;
  };