export const handleRequest = <T>(request: Promise<Response>): Promise<T> => {
  return request.then(async (res) => {
    const data = await res.json();

    if (res.ok) return data;

    throw data;
  });
};
