export type GeoJSONGeometryType =
  | 'Point'
  | 'MultiPoint'
  | 'LineString'
  | 'MultiLineString'
  | 'Polygon'
  | 'MultiPolygon'
  | 'GeometryCollection';

export interface GeoJSONGeometry {
  type: GeoJSONGeometryType;
  coordinates?: unknown;
  geometries?: GeoJSONGeometry[];
}

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: GeoJSONGeometry | null;
  properties: Record<string, unknown> | null;
  [member: string]: unknown;
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
  [member: string]: unknown;
}

export type GeoJSONRoot = GeoJSONGeometry | GeoJSONFeature | GeoJSONFeatureCollection;
