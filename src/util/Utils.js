const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  // Regex for indian numbering system
  // It handles the first three digits, then every two digits
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ",",
    );

    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree; // No change if less than 4 digits
  }

  // combine integer and fractional parts
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

export default addThousandsSeparator;
