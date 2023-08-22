export type RecusriveObjectMapCallback = (key: string, value: any) => { newKey: string, newValue: any };

/**
 * Maps an object recursively
 * 
 * @example
 * #### Replace keys and string values
```ts
const myObject = {
  foo: 'bar',
  baz: {
    qux: 'quux',
    corge: {
      grault: 'garply',
    }
  }
};

const result = await recursiveObjectMap(myObject, (key, value) => {
  return {
    newKey: `My Key: ${key}`,
    newValue: typeof value === 'string' ? `My Value: ${value}` : value,
  }
}
console.log({result})
// {
//   "My Key: foo": "My Value: bar",
//   "My Key: baz": {
//     "My Key: qux": "My Value: quux",
//     "My Key: corge": {
//       "My Key: grault": "My Value: garply"
//     }
//   }
// }
```
 */
export async function recursiveObjectMap(obj: Record<string, any>, mapFn: RecusriveObjectMapCallback): Promise<Record<string, any>> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const { newKey, newValue } = mapFn(key, value);
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[newKey] = await recursiveObjectMap(newValue, mapFn);
    } else {
      result[newKey] = newValue;
    }
  }
  return result;
}