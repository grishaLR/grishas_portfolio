export const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.play().catch((error) => console.error('Failed to play sound:', error));
};
