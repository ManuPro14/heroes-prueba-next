import { HeroDetails, HeroResponse } from "../types";

export const getHeroes = async (page = 1, size = 8): Promise<HeroResponse> => {
  const res = await fetch(
    `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/heroes?page=${page}&size=${size}`
  );
  return res.json();
};

export const getHeroById = async (id: number): Promise<HeroDetails> => {
  const res = await fetch(
    `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/hero?id=${id}`
  );
  if (!res.ok) {
    throw new Error(`Error fetching hero by ID ${id}: ${res.statusText}`);
  }
  return res.json();
};
