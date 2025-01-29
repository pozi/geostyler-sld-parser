import { Channel, ChannelSelection, ColorMap, ColorMapType, ComparisonFilter, ContrastEnhancement, Expression, FillSymbolizer, Filter, IconSymbolizer, LineSymbolizer, MarkSymbolizer, PointSymbolizer, RasterSymbolizer, ReadStyleResult, Rule, ScaleDenominator, Style, StyleParser, Symbolizer, TextSymbolizer, UnsupportedProperties, WriteStyleResult } from 'geostyler-style/dist/style';
import { X2jOptions, XMLBuilder, XmlBuilderOptions, XMLParser } from 'fast-xml-parser';
declare const SLD_VERSIONS: readonly ["1.0.0", "1.1.0"];
export type SldVersion = (typeof SLD_VERSIONS)[number];
export type ParserOptions = Omit<X2jOptions, 'ignoreDeclaration' | 'removeNSPrefix' | 'ignoreAttributes' | 'preserveOrder' | 'trimValues'>;
export type BuilderOptions = Omit<XmlBuilderOptions, 'cdataPropName' | 'ignoreAttributes' | 'suppressEmptyNode' | 'preserveOrder'>;
export type ConstructorParams = {
    numericFilterFields?: string[];
    boolFilterFields?: string[];
    sldVersion?: SldVersion;
    symbolizerUnits?: string;
    parserOptions?: ParserOptions;
    builderOptions?: XmlBuilderOptions;
    translations?: SldStyleParserTranslations;
    locale?: string;
};
declare const COMPARISON_MAP: {
    PropertyIsEqualTo: string;
    PropertyIsNotEqualTo: string;
    PropertyIsLike: string;
    PropertyIsLessThan: string;
    PropertyIsLessThanOrEqualTo: string;
    PropertyIsGreaterThan: string;
    PropertyIsGreaterThanOrEqualTo: string;
    PropertyIsNull: string;
    PropertyIsBetween: string;
};
type ComparisonType = keyof typeof COMPARISON_MAP;
export type SldStyleParserTranslationKeys = {
    marksymbolizerParseFailedUnknownWellknownName?: (params: {
        wellKnownName: string;
    }) => string;
    noFilterDetected?: string;
    symbolizerKindParseFailed?: (params: {
        sldSymbolizerName: string;
    }) => string;
    colorMapEntriesParseFailedColorUndefined?: string;
    contrastEnhancParseFailedHistoAndNormalizeMutuallyExclusive?: string;
    channelSelectionParseFailedRGBAndGrayscaleMutuallyExclusive?: string;
    channelSelectionParseFailedRGBChannelsUndefined?: string;
};
export type SldStyleParserTranslations = Record<string, SldStyleParserTranslationKeys>;
export declare const defaultTranslations: SldStyleParserTranslations;
/**
 * This parser can be used with the GeoStyler.
 * It implements the geostyler-style StyleParser interface.
 *
 * @class SldStyleParser
 * @implements StyleParser
 */
export declare class SldStyleParser implements StyleParser<string> {
    /**
     * The name of the SLD Style Parser.
     */
    static title: string;
    title: string;
    unsupportedProperties: UnsupportedProperties;
    translations: SldStyleParserTranslations;
    locale: string;
    constructor(opts?: ConstructorParams);
    translate(key: keyof SldStyleParserTranslationKeys, params?: any): string;
    private _parser;
    get parser(): XMLParser;
    set parser(parser: XMLParser);
    private _builder;
    get builder(): XMLBuilder;
    set builder(builder: XMLBuilder);
    /**
     * Array of field / property names in a filter, which are casted to numerics
     * while parsing a SLD.
     */
    private _numericFilterFields;
    /**
     * Getter for _numericFilterFields
     * @return The numericFilterFields
     */
    get numericFilterFields(): string[];
    /**
     * Setter for _numericFilterFields
     * @param numericFilterFields The numericFilterFields to set
     */
    set numericFilterFields(numericFilterFields: string[]);
    /**
     * Array of field / property names in a filter, which are casted to boolean
     * while parsing a SLD.
     */
    private _boolFilterFields;
    /**
     * Getter for _boolFilterFields
     * @return The boolFilterFields
     */
    get boolFilterFields(): string[];
    /**
     * Setter for _boolFilterFields
     * @param boolFilterFields The boolFilterFields to set
     */
    set boolFilterFields(boolFilterFields: string[]);
    /**
     * String indicating the SLD version to use. 1.1.0 will make use of
     * Symbology Encoding.
     */
    private _sldVersion;
    /**
     * Getter for _sldVersion
     * @return
     */
    get sldVersion(): SldVersion;
    /**
     * Setter for _sldVersion
     * @param sldVersion The _sldVersion value to set
     */
    set sldVersion(sldVersion: SldVersion);
    /**
     * String indicating the SLD version used in reading mode
     */
    private _readingSldVersion;
    /**
       * Getter for _readingSldVersion
       * @return
       */
    get readingSldVersion(): SldVersion;
    /**
     * Setter for _readingSldVersion
     * @param sldVersion The _readingSldVersion value to set
     */
    set readingSldVersion(sldVersion: SldVersion);
    /**
     * Used to add a `uom` attribute to the symbolizer tag. Can be one of
     * `metre`, `foot` or `pixel`. Defaults to pixel.
     */
    private _symbolizerUnits;
    /**
     * Getter for _symbolizerUnits
     * @return {string}
     */
    get symbolizerUnits(): string;
    /**
     * Setter for _symbolizerUnits
     * @param {string} symbolizerUnits The _symbolizerUnits value to set
     */
    set symbolizerUnits(symbolizerUnits: string);
    /**
     * The readStyle implementation of the geostyler-style StyleParser interface.
     * It reads a SLD as a string and returns a Promise.
     * The Promise itself resolves with an object containing the geostyler-style.
     *
     * @param sldString A SLD as a string.
     * @return The Promise resolving with an object containing the geostyler-style.
     */
    readStyle(sldString: string): Promise<ReadStyleResult>;
    /**
     * Get the geostyler-style from a SLD Object (created with fast-xml-parser).
     *
     * @param sldObject The SLD object representation (created with fast-xml-parser)
     * @return The geostyler-style
     */
    sldObjectToGeoStylerStyle(sldObject: any): Style;
    /**
     * Get the geostyler-style rules from a SLD Object (created with fast-xml-parser).
     *
     * @param sldObject The SLD object representation (created with fast-xml-parser)
     * @return The geostyler-style rules
     */
    getRulesFromSldObject(sldObject: any): Rule[];
    /**
     * Get the name for the Style from the SLD Object. Returns the Title of the UserStyle
     * if defined or the Name of the NamedLayer if defined or an empty string.
     *
     * @param sldObject The SLD object representation (created with fast-xml-parser)
     * @return The name to be used for the GeoStyler Style Style
     */
    getStyleNameFromSldObject(sldObject: any): string;
    /**
     * Get the geostyler-style Filter from a SLD Rule.
     *
     * Currently only supports one Filter per Rule.
     *
     * @param sldRule The SLD Rule
     * @return The geostyler-style Filter
     */
    getFilterFromRule(sldRule: any[]): Filter | undefined;
    /**
     * Get the geostyler-style ScaleDenominator from a SLD Rule.
     *
     * @param sldRule The SLD Rule
     * @return The geostyler-style ScaleDenominator
     */
    getScaleDenominatorFromRule(sldRule: any[]): ScaleDenominator | undefined;
    /**
     * Get the geostyler-style Symbolizers from a SLD Rule.
     *
     * @param sldRule The SLD Rule
     * @return The geostyler-style Symbolizer array
     */
    getSymbolizersFromRule(sldRule: any[]): Symbolizer[];
    /**
     * Creates a geostyler-style Filter from a given operator name and the js
     * SLD object representation (created with fast-xml-parser) of the SLD Filter.
     *
     * @param sldOperatorName The Name of the SLD Filter Operator
     * @param sldFilter The SLD Filter
     * @return The geostyler-style Filter
     */
    getFilterFromOperatorAndComparison(sldOperatorName: ComparisonType | 'Function', sldFilter: any): Filter;
    /**
     * Get the geostyler-style PointSymbolizer from a SLD Symbolizer.
     *
     * The opacity of the Symbolizer is taken from the <Graphic>.
     *
     * @param sldSymbolizer The SLD Symbolizer
     * @return The geostyler-style PointSymbolizer
     */
    getPointSymbolizerFromSldSymbolizer(sldSymbolizer: any): PointSymbolizer;
    /**
     * Get the geostyler-style LineSymbolizer from a SLD Symbolizer.
     *
     * Currently only the CssParameters are available.
     *
     * @param sldSymbolizer The SLD Symbolizer
     * @return The geostyler-style LineSymbolizer
     */
    getLineSymbolizerFromSldSymbolizer(sldSymbolizer: any): LineSymbolizer;
    /**
     * Get the geostyler-style TextSymbolizer from a SLD Symbolizer.
     *
     * @param sldSymbolizer The SLD Symbolizer
     * @return The geostyler-style TextSymbolizer
     */
    getTextSymbolizerFromSldSymbolizer(sldSymbolizer: any): TextSymbolizer;
    /**
     * Create a template string from a TextSymbolizer Label element.
     * The ordering of the elemments inside the Label element is preserved.
     *
     * Examples:
     * <Label>
     *  <Literal>foo</Literal>
     *  <PropertyName>bar</PropertyName>
     * </Label>
     * --> "foo{{bar}}"
     *
     * <Label>
     *  <PropertyName>bar</PropertyName>
     *  <Literal>foo</Literal>
     * </Label>
     * --> "{{bar}}foo"
     *
     * <Label>
     *  <PropertyName>bar</PropertyName>
     *  <Literal>foo</Literal>
     *  <PropertyName>john</PropertyName>
     * </Label>
     * --> "{{bar}}foo{{john}}"
     *
     * <Label>
     *  <PropertyName>bar</PropertyName>
     *  <PropertyName>john</PropertyName>
     *  <Literal>foo</Literal>
     * </Label>
     * --> "{{bar}}{{john}}foo"
     *
     * <Label>
     *  <PropertyName>bar</PropertyName>
     *  <PropertyName>john</PropertyName>
     *  <Literal>foo</Literal>
     *  <PropertyName>doe</PropertyName>
     * </Label>
     * --> "{{bar}}{{john}}foo{{doe}}"
     *
     * @param sldLabel
     */
    getTextSymbolizerLabelFromSldSymbolizer: (sldLabel: any) => string;
    /**
     * Get the geostyler-style FillSymbolizer from a SLD Symbolizer.
     *
     * PolygonSymbolizer Stroke is just partially supported.
     *
     * @param sldSymbolizer The SLD Symbolizer
     * @return The geostyler-style FillSymbolizer
     */
    getFillSymbolizerFromSldSymbolizer(sldSymbolizer: any): FillSymbolizer;
    /**
     * Get the geostyler-style RasterSymbolizer from a SLD Symbolizer.
     *
     * @param sldSymbolizer The SLD Symbolizer
     */
    getRasterSymbolizerFromSldSymbolizer(sldSymbolizer: any): RasterSymbolizer;
    /**
     * Get the geostyler-style MarkSymbolizer from a SLD Symbolizer
     *
     * @param sldSymbolizer The SLD Symbolizer
     * @return The geostyler-style MarkSymbolizer
     */
    getMarkSymbolizerFromSldSymbolizer(sldSymbolizer: any): MarkSymbolizer;
    /**
     * Get the geostyler-style IconSymbolizer from a SLD Symbolizer
     *
     * @param sldSymbolizer The SLD Symbolizer
     * @return The geostyler-style IconSymbolizer
     */
    getIconSymbolizerFromSldSymbolizer(sldSymbolizer: any): IconSymbolizer;
    /**
     * Get the geostyler-style ColorMap from a SLD ColorMap.
     *
     * @param sldColorMap The SLD ColorMap
     */
    getColorMapFromSldColorMap(sldColorMap: any, type?: ColorMapType, extended?: string): ColorMap;
    /**
     * Get the geostyler-style ContrastEnhancement from a SLD ContrastEnhancement.
     *
     * @param sldContrastEnhancement The SLD ContrastEnhancement
     */
    getContrastEnhancementFromSldContrastEnhancement(sldContrastEnhancement: any): ContrastEnhancement;
    /**
     * Get the geostyler-style Channel from a SLD Channel.
     *
     * @param sldChannel The SLD Channel
     */
    getChannelFromSldChannel(sldChannel: any): Channel;
    /**
     * Get the geostyler-style ChannelSelection from a SLD ChannelSelection.
     *
     * @param sldChannelSelection The SLD ChannelSelection
     */
    getChannelSelectionFromSldChannelSelection(sldChannelSelection: any): ChannelSelection;
    /**
     * The writeStyle implementation of the geostyler-style StyleParser interface.
     * It reads a geostyler-style and returns a Promise.
     * The Promise itself resolves with a SLD string.
     *
     * @param geoStylerStyle A geostyler-style.
     * @return The Promise resolving with the SLD as a string.
     */
    writeStyle(geoStylerStyle: Style): Promise<WriteStyleResult<string>>;
    /**
     * Get the correct tagName in dependency to the configured sldVersion.
     *
     * @param tagName
     * @returns The tagName as used by the configured sldVersion
     */
    getTagName(tagName: string): string;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style
     *
     * @param geoStylerStyle A geostyler-style.
     * @return The object representation of a SLD Style (readable with fast-xml-parser)
     */
    geoStylerStyleToSldObject(geoStylerStyle: Style): any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style Rule.
     *
     * @param rules An array of geostyler-style Rules.
     * @return The object representation of a SLD Rule (readable with fast-xml-parser)
     */
    getSldRulesFromRules(rules: Rule[]): any[];
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style ComparisonFilter.
     *
     * @param comparisonFilter A geostyler-style ComparisonFilter.
     * @return The object representation of a SLD Filter Expression with a
     * comparison operator (readable with fast-xml-parser)
     */
    getSldComparisonFilterFromComparisonFilter(comparisonFilter: ComparisonFilter): any[];
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style Filter.
     *
     * @param filter A geostyler-style Filter.
     * @return The object representation of a SLD Filter Expression (readable with fast-xml-parser)
     */
    getSldFilterFromFilter(filter: Filter): any[];
    /**
     * Get the SLD Object (readable with fast-xml-parser) from geostyler-style Symbolizers.
     *
     * @param symbolizers A geostyler-style Symbolizer array.
     * @return The object representation of a SLD Symbolizer (readable with fast-xml-parser)
     */
    getSldSymbolizersFromSymbolizers(symbolizers: Symbolizer[]): any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style MarkSymbolizer.
     *
     * @param markSymbolizer A geostyler-style MarkSymbolizer.
     * @return The object representation of a SLD PointSymbolizer with a Mark
     */
    getSldPointSymbolizerFromMarkSymbolizer(markSymbolizer: MarkSymbolizer): any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style IconSymbolizer.
     *
     * @param iconSymbolizer A geostyler-style IconSymbolizer.
     * @return The object representation of a SLD PointSymbolizer with
     * an "ExternalGraphic" (readable with fast-xml-parser)
     */
    getSldPointSymbolizerFromIconSymbolizer(iconSymbolizer: IconSymbolizer): any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style TextSymbolizer.
     *
     * @param textSymbolizer A geostyler-style TextSymbolizer.
     * @return The object representation of a SLD TextSymbolizer (readable with fast-xml-parser)
     */
    getSldTextSymbolizerFromTextSymbolizer(textSymbolizer: TextSymbolizer): any;
    /**
     * Get the Label from a TextSymbolizer
     *
     * @param template The Expression<string> representing the label
     */
    getSldLabelFromTextSymbolizer: (template: Expression<string>) => any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style LineSymbolizer.
     *
     * @param lineSymbolizer A geostyler-style LineSymbolizer.
     * @return The object representation of a SLD LineSymbolizer (readable with fast-xml-parser)
     */
    getSldLineSymbolizerFromLineSymbolizer(lineSymbolizer: LineSymbolizer): any[];
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style FillSymbolizer.
     *
     * @param fillSymbolizer A geostyler-style FillSymbolizer.
     * @return The object representation of a SLD PolygonSymbolizer (readable with fast-xml-parser)
     */
    getSldPolygonSymbolizerFromFillSymbolizer(fillSymbolizer: FillSymbolizer): any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style RasterSymbolizer.
     *
     * @param rasterSymbolizer A geostyler-style RasterSymbolizer.
     * @return The object representation of a SLD RasterSymbolizer (readable with fast-xml-parser)
     */
    getSldRasterSymbolizerFromRasterSymbolizer(rasterSymbolizer: RasterSymbolizer): any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style ColorMap.
     *
     * @param colorMap A geostyler-style ColorMap.
     * @return The object representation of a SLD ColorMap (readable with fast-xml-parser)
     */
    getSldColorMapFromColorMap(colorMap: ColorMap): any;
    /**
     * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style ChannelSelection.
     *
     * @param channelSelection A geostyler-style ChannelSelection.
     * @return The object representation of a SLD ChannelSelection (readable with fast-xml-parser)
     */
    getSldChannelSelectionFromChannelSelection(channelSelection: ChannelSelection): any;
    /**
       * Get the SLD Object (readable with fast-xml-parser) from a geostyler-style ContrastEnhancement.
       *
       * @param contrastEnhancement A geostyler-style ContrastEnhancement.
       * @return The object representation of a SLD ContrastEnhancement (readable with fast-xml-parser)
       */
    getSldContrastEnhancementFromContrastEnhancement(contrastEnhancement: ContrastEnhancement): any;
    checkForUnsupportedProperties(geoStylerStyle: Style): UnsupportedProperties | undefined;
}
export default SldStyleParser;
