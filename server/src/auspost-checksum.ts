export function calculateCheckSum(input: string): number {
  // TC 4714 (505) Atlas Programmed Marine Pty Ltd MSIC_ASIC EIS ID Checks Specification.docx
  // 5Check Digit Calculation
  const weights = [
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97,
    101,
    103,
    107,
    109,
    113
  ];

  if (weights.length !== 29) {
    throw new Error('Invalid weight value');
  }

  if (input && input.length === 29) {
    // valid input data
    let sum = 0;

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < input.length; i++) {
      const inputChar = input.charAt(i).toLocaleUpperCase();
      // tslint:disable-next-line:radix
      let toIntValue = parseInt(inputChar);

      if (isNaN(toIntValue)) {
        toIntValue = inputChar.charCodeAt(0) - 48;
      }

      sum += toIntValue * weights[i];
    }

    return 97 - (sum % 97);
  }

  return -100; // invalid input value
  // throw new Error('Failed to calculate checksum,  input value must be 29 chracters');
}

const main = () => {
  const FAILED_CODE = -100;

  let actual = calculateCheckSum('');
  let test = "calculateCheckSum('')";

  console.log(`${test} passed: ${actual === FAILED_CODE}`);

  actual = calculateCheckSum('4714ZB50518052155556666555500');
  test = "calculateCheckSum('4714ZB50518052155556666555500')";
  console.log(`${test} passed: ${actual === 25}${actual === 25 ? '' : `, actual = ${actual}`}`);
};

main();
