export const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.play().catch((error) => console.error('Failed to play sound:', error));
};

/*
 * Example:
 * createApi({
 *   reducerPath: 'myApi',
 *   endpoints: builder => ({
 *     getMyData: builder.query({
 *       queryFn: serviceQueryFactory(getMyDataFn),
 *     }),
 *   }),
 */

export const serviceQueryFactory =
  (service: (...params: any[]) => Promise<any>) =>
  async (...params: any[]): Promise<{ data?: any; error?: { status: number; error: string } }> => {
    try {
      const data = await service(...params);
      return { data };
    } catch (e: any) {
      return {
        error: {
          status:
            e?.status ||
            e?.response?.status ||
            e?.cause?.response?.status ||
            e?.cause?.response?.data?.status_code ||
            -1,
          error:
            e?.statusText ||
            e?.cause?.response?.data?.message ||
            e?.cause?.response?.data?.errors ||
            'Unknown',
        },
      };
    }
  };
