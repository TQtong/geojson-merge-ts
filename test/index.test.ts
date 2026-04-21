import {
  merge,
  normalizeGeoJSON,
  type GeoJSONFeature,
  type GeoJSONGeometry
} from '../src/index.js';

const point: GeoJSONGeometry = {
  type: 'Point',
  coordinates: [0, 1]
};

const feature: GeoJSONFeature = {
  type: 'Feature',
  geometry: point,
  properties: {}
};

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}：期望 ${String(expected)}，实际 ${String(actual)}`);
  }
}

function testMerge(): void {
  const merged = merge([point, feature]);

  assertEqual(merged.type, 'FeatureCollection', 'merge 应返回 FeatureCollection');
  assertEqual(merged.features.length, 2, 'merge 应保留两个要素');
}

function testNormalizeGeoJSON(): void {
  const normalized = normalizeGeoJSON(point);

  assertEqual(normalized.type, 'FeatureCollection', 'normalizeGeoJSON 应返回 FeatureCollection');
  assertEqual(normalized.features.length, 1, 'normalizeGeoJSON 应包装单个 Geometry');
}

function main(): void {
  testMerge();
  testNormalizeGeoJSON();
  console.log('测试通过');
}

main();
