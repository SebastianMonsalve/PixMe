export const Format = (url) => {
  const format = url.split(".");
  const formatObject = format[format.length - 1];
  return formatObject;
};
