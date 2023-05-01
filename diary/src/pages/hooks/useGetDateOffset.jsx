const useGetDateOffset = (dateInDaily) => {
  const offset = dateInDaily.getTimezoneOffset() * 60000;
  const dateOffset = new Date(dateInDaily.getTime() - offset);
  return dateOffset.toISOString().substring(0, 10);
};

export default useGetDateOffset;
