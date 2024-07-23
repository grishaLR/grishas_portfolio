export interface Player {
  id: number;
  name: string;
  price: number;
  priceChange: number;
  points: number;
  team: string;
}

export const generateMockData = (): Player[] => {
  const mockData: Player[] = [];
  for (let i = 1; i <= 100; i++) {
    mockData.push({
      id: i,
      name: `Player ${i}`,
      price: parseFloat((Math.random() * 10 + 5).toFixed(1)), // Price between 5.0 and 15.0
      priceChange: parseFloat((Math.random() * 2 - 1).toFixed(1)), // Price change between -1.0 and 1.0
      points: Math.floor(Math.random() * 200), // Points between 0 and 200
      team: `Team ${String.fromCharCode(65 + (i % 26))}`, // Team A-Z
    });
  }
  return mockData;
};
