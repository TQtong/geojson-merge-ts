export type {
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  GeoJSONGeometry,
  GeoJSONRoot
} from './geojson.js';
import type {
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  GeoJSONGeometry,
  GeoJSONRoot
} from './geojson.js';

function isFeatureCollection(input: GeoJSONRoot): input is GeoJSONFeatureCollection {
  return input.type === 'FeatureCollection' && Array.isArray((input as GeoJSONFeatureCollection).features);
}

function isFeature(input: GeoJSONRoot): input is GeoJSONFeature {
  return input.type === 'Feature' && 'geometry' in input;
}

function toFeature(input: GeoJSONGeometry): GeoJSONFeature {
  return {
    type: 'Feature',
    geometry: input,
    properties: {}
  };
}

/**
 * 将任意 GeoJSON 根对象规范化为 FeatureCollection。
 *
 * 这样浏览器端可以直接使用纯 TypeScript 逻辑，不依赖 Node 模块和第三方
 * CommonJS 工具库。
 */
export function normalizeGeoJSON(input: GeoJSONRoot): GeoJSONFeatureCollection {
  if (isFeatureCollection(input)) {
    return {
      type: 'FeatureCollection',
      features: [...input.features]
    };
  }

  if (isFeature(input)) {
    return {
      type: 'FeatureCollection',
      features: [input]
    };
  }

  return {
    type: 'FeatureCollection',
    features: [toFeature(input)]
  };
}

/**
 * 将多个 GeoJSON 根对象合并为一个 FeatureCollection。
 *
 * 输入可以是 Geometry、Feature 或 FeatureCollection；函数会先把每个对象
 * 规范化，再统一收集其中的 Feature，整个过程可以直接在浏览器中运行。
 */
export function merge(inputs: readonly GeoJSONRoot[]): GeoJSONFeatureCollection {
  const output: GeoJSONFeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  for (const input of inputs) {
    // 先统一成 FeatureCollection，再把其中的 Feature 追加到结果集中。
    const normalized = normalizeGeoJSON(input);
    output.features.push(...normalized.features);
  }

  return output;
}
