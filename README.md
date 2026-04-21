# geojson-merge-ts

一个只面向浏览器的 TypeScript GeoJSON 合并工具，可将多个 GeoJSON 对象合并为一个 `FeatureCollection`。

## 安装依赖

```bash
npm install
```

## 构建与测试

```bash
npm run build
npm test
```

## API

### `merge(inputs)`

将 `Geometry`、`Feature` 或 `FeatureCollection` 统一合并为一个 `FeatureCollection`。

```ts
import { merge } from '@mapbox/geojson-merge';

const mergedGeoJSON = merge([
  { type: 'Point', coordinates: [0, 1] },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] }, properties: {} }
]);

console.log(JSON.stringify(mergedGeoJSON));
```

### `normalizeGeoJSON(input)`

将单个 `Geometry`、`Feature` 或 `FeatureCollection` 统一转换为 `FeatureCollection`，适合在浏览器端先做标准化，再继续拼装数据。

```ts
import { normalizeGeoJSON } from '@mapbox/geojson-merge';

const normalized = normalizeGeoJSON({
  type: 'Point',
  coordinates: [0, 1]
});
```

## 使用场景

- 浏览器端合并用户上传后的多个 GeoJSON 对象
- 前端地图应用里统一处理 `Geometry` / `Feature` / `FeatureCollection`
- 不依赖 Node 内置模块，也不包含 CLI 与文件流逻辑


## License

MIT

## 原始项目地址
https://github.com/mapbox/geojson-merge