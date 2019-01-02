export function calculateCheckSum(input: string): string {
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

    const checkSumNumber = 97 - (sum % 97);

    if (checkSumNumber < 10) {
      return `0${checkSumNumber}`;
    }

    return checkSumNumber.toString();
  }

  return 'ERROR'; // invalid input value
  // throw new Error('Failed to calculate checksum,  input value must be 29 chracters');
}

function logTestResult(test: string, actual: string, expected: string) {
  console.log(
    `${test} passed: ${actual === expected}${actual === expected ? '' : `, expected ${actual} to be ${expected}`}`
  );
}

function executeTest(input: string, expected: string) {
  const actual = calculateCheckSum(input);
  const test = `calculateCheckSum(${input})`;
  logTestResult(test, actual, expected);
}

const main = () => {
  const FAILED_CODE = 'ERROR';

  executeTest('', FAILED_CODE);
  executeTest('4714ZB50518052155556666555500', '25');
  executeTest('4714ZB50500000010000000121234', '72');
  executeTest('4714ZB50518062112345678901234', '04');
  executeTest('4714ZB50518072110345678901234', '83');
  executeTest('4714ZB50518082110045678901234', '47');
  executeTest('4714ZB50518092110005678901234', '94');
  executeTest('4714ZB50518102110000678901234', '29');
  executeTest('4714ZB50518112110000078901234', '72');
  executeTest('4714ZB50518122110000008901234', '28');
  executeTest('4714ZB50518042110000000901234', '16');
  executeTest('4714ZB50518032110000000121234', '51');
};

main();
