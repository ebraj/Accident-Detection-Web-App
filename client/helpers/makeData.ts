import { faker } from "@faker-js/faker";

export type OgAccident = {
  id: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  severityInPercentage: number;
  severity: "low" | "mid" | "high" | "extreme";
  date: string;
};

export type Accident = {
  city: string;
  latitude: number;
  longitude: number;
  severetyInPercentage: number;
  severty: "low" | "mid" | "high" | "extreme";
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newAccident = (): Accident => {
  return {
    city: faker.location.city(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    severetyInPercentage: faker.number.int(100),
    severty: faker.helpers.shuffle<Accident["severty"]>([
      "low",
      "mid",
      "high",
      "extreme",
    ])[0],
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Accident[] => {
    const len = lens[depth]!;
    return range(len).map((single): Accident => {
      return {
        ...newAccident(),
      };
    });
  };
  return makeDataLevel();
}
