export const formatE164ToReadable = (e164Number: string): string => {
  // Remove any non-digit characters
  const cleanedNumber = e164Number.replace(/\D/g, "");

  // Extract country code and local number
  const countryCode = cleanedNumber.slice(0, 1);
  const localNumber = cleanedNumber.slice(1);

  // Format as human-readable string
  const formattedNumber = `+${countryCode} (${localNumber.slice(
    0,
    3
  )}) ${localNumber.slice(3, 6)}-${localNumber.slice(6)}`;

  return formattedNumber;
};
