export const getCountdown = (futureDate: number): [number, number, number] => {
  const now = Date.now();

  const timeDiff = futureDate - now;

  if (timeDiff <= 0) {
    return [0, 0, 0];
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return [days, hours, minutes];
};
