import { Expression, PropertyType } from 'geostyler-style/dist/style';
import { SldVersion } from '../SldStyleParser';
import { GeoStylerFunction, GeoStylerNumberFunction } from 'geostyler-style/dist/functions';
/**
 * Cast to Number if it is not a GeoStylerFunction
 *
 * @param exp The GeoStylerExpression
 * @returns The value casted to a number or the GeoStylerNumberFunction
 */
export declare function numberExpression(exp: Expression<PropertyType>): GeoStylerNumberFunction | number;
/**
 * This converts a GeoStylerFunction into a fast-xml-parser representation
 * of a sld function.
 *
 * @param geostylerFunction A GeoStylerFunction
 * @returns
 */
export declare function geoStylerFunctionToSldFunction(geostylerFunction: GeoStylerFunction): any;
/**
 * This converts the fast-xml-parser representation of a sld function into
 * a GeoStylerFunction.
 *
 * @param sldFunction An array of objects as created by the fast-xml-parser
 * @returns The GeoStylerFunction
 */
export declare function sldFunctionToGeoStylerFunction(sldFunction: any[]): GeoStylerFunction;
/**
 * Get all child objects with a given tag name.
 *
 * @param elements An array of objects as created by the fast-xml-parser.
 * @param tagName The tagname to get.
 * @returns An array of objects as created by the fast-xml-parser.
 */
export declare function getChildren(elements: any[], tagName: string): any[];
/**
 * Get the child object with a given tag name.
 *
 * @param elements An array of objects as created by the fast-xml-parser.
 * @param tagName The tagname to get.
 * @returns An object as created by the fast-xml-parser.
 */
export declare function getChild(elements: any[], tagName: string): any;
/**
 * Get the value of a Css-/SvgParameter.
 *
 * @param elements An array of objects as created by the fast-xml-parser.
 * @param parameter The parameter name to get.
 * @param sldVersion The sldVersion to distinguish if CssParameter or SvgParameter is used.
 * @returns The string value of the searched parameter.
 */
export declare function getParameterValue(elements: any[], parameter: string, sldVersion: SldVersion): any;
/**
 * Get the attribute value of an object.
 *
 * @param obj The object to check.
 * @param name The name of the attribute
 * @returns The value of the requested parameter (if available)
 */
export declare function getAttribute(obj: any, name: string): any | undefined;
/**
 * Determine if a fast-xml-parser object is a symbolizer representation.
 *
 * @param obj The object to check.
 * @returns Whether the passed object is a symbolizer representation or not.
 */
export declare function isSymbolizer(obj: any): boolean;
/**
 * Generic get function which tries to get the nested value of the given object or array.
 * It contains some SLD specific handling and tries to be smart but keep the syntax easy.
 * It always takes the first child of an array if no index was specified in the path argument.
 * e.g.
 *   Get text value: get(sldSymbolizer, 'Graphic.Mark.WellKnownName.#text')
 *   Get an attribute value: get(sldSymbolizer, 'Graphic.ExternalGraphic.OnlineResource.@xlink:href')
 *   Get an Css-/SvgParameter value: get(sldSymbolizer, 'Graphic.Mark.Fill.$fill-opacity', '1.1.0')
 *   Use with an index: get(sldObject, 'StyledLayerDescriptor.NamedLayer[1].UserStyle.Title.#text')
 *
 * @param obj A part of the parser result of the fast-xml-parser.
 * @param path The path to get the value from.
 * @param sldVersion The SLD version to use.
 * @returns
 */
export declare function get(obj: any, path: string, sldVersion?: SldVersion): any | undefined;
/**
 * Returns the keys of an object where the value is equal to the passed in
 * value.
 *
 * @param object The object to get the key from.
 * @param value The value to get the matching key from.
 * @return The matching keys.
 */
export declare function keysByValue(object: any, value: any): string[];
