import { decodeDelimitedArray, encodeDelimitedArray } from 'use-query-params';

import { isDefined } from './helpers';

export function getEnumParam<T extends string, TEnumValue>(enumParam: { [key in T]: TEnumValue }) {
  return {
    encode: (array: TEnumValue[]) => {
      if (array && Array.isArray(array)) {
        const stringArray = array.map(String);
        return encodeDelimitedArray(stringArray, ',');
      }
      return undefined;
    },
    decode: (arrayStr: string | (string | null)[] | null | undefined) => {
      if (typeof arrayStr === 'string') {
        const array = decodeDelimitedArray(arrayStr, ',');
        if (array) {
          return array
            .map((item) => Object.values(enumParam).find((enumValue) => item === enumValue) as TEnumValue)
            .filter(isDefined);
        }
      }
      return undefined;
    },
  };
}
