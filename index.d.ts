export as namespace SlowJsonStringify;

export type JSONPrimitive =
  string
  | number
  | boolean
  | null;

export type AttrType =
  'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'null';

/**
 * SjsSchema
 * 
 * Schema that describe the structure of your data.
 * 
 * Usage: https://github.com/lucagez/slow-json-stringify#usage
 */
export type SjsSchema = { [prop: string]: AttrExecutable | SjsSchema };

/**
 * SjsSerializer
 * 
 * Serialize any object enforcing the provided schema.
 */
export type SjsSerializer = (obj: object) => string;

/**
 * SjsEscaper
 * 
 * Escape any string against the previously provided regex.
 */
export type SjsEscaper = (str: string) => string;

/**
 * AttrExecutable
 * 
 * Object that should be used only inside sjs schemas.
 */
export type AttrExecutable = object;

/**
 * Mapping between AttrType and JSONPrimitive??
 * 
 * The resulting JSONPrimitive should be of the same
 * type of AttrType. As the created template has a spot
 * to host the requested type.
 */
export type Serializer = (raw: any) => JSONPrimitive;

/**
 * attr
 * 
 * Utility used to define how sjs should handle the
 * provided raw data.
 */
export function attr(type: 'array', serializer?: SjsSerializer): AttrExecutable;
export function attr(type: AttrType, serializer?: Serializer): AttrExecutable;

/**
 * escape
 * 
 * Provides basic escaping facilities.
 * @default regex - \\n|\\r|\\t|\\"|\\\\
 */
export function escape(regex?: RegExp): (str: string) => string;
/**
 * sjs
 * 
 * compile the provided schema and exports a function
 * that serialize objects enforcing the schema.
 */
export function sjs(schema: SjsSchema): SjsEscaper;
