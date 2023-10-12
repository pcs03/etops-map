import Circle from "ol/geom/Circle.js";
import Feature from "ol/Feature.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { fromLonLat, toLonLat } from "ol/proj";
import { Text as OlText } from "ol/style.js";

const image = new CircleStyle({
  radius: 3,
  fill: new Fill({
    color: "rgb(50, 50, 50)",
  }),
  stroke: new Stroke({ color: "rgb(200, 50, 50)", width: 2 }),
});

const styles = {
  Point: new Style({
    image: image,
    text: new OlText({
      font: "12px Calibri,sans-serif",
      placement: "line",
      fill: new Fill({
        color: "#000",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 3,
      }),
    }),
  }),
  LineString: new Style({
    stroke: new Stroke({
      color: "rgb(100, 100, 255)",
      width: 5,
    }),
  }),
  Circle: new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    fill: new Fill({
      color: "rgba(255,0,0,0.2)",
    }),
  }),
};

const styleFunction = function (feature) {
  const type = feature.getGeometry().getType();
  const style = styles[type];

  if (type === "Point") {
    style.getText().setText(feature.get("name"));

    console.log(style.getText());
  }

  return style;
};

const geojsonObject = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:3857",
    },
  },
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: fromLonLat([113.915, 22.3089]),
      },
      properties: {
        name: "VHHH",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: fromLonLat([4.765, 52.3]),
      },
      properties: {
        name: "EHAM",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: fromLonLat([113.591389, 22.149444]),
      },
      properties: {
        name: "ZLLL",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: fromLonLat([87.474167, 43.907222]),
      },
      properties: {
        name: "ZWWW",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: fromLonLat([50.046667, 40.4675]),
      },
      properties: {
        name: "UBBB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: fromLonLat([19.261944, 47.439444]),
      },
      properties: {
        name: "LHBP",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          fromLonLat([113.915, 22.3089]),
          fromLonLat([113.422222, 24.421389]),
          fromLonLat([110.776667, 24.67]),
          fromLonLat([108.397222, 26.096667]),
          fromLonLat([104.270833, 33.357222]),
          fromLonLat([104.1125, 36.529444]),
          fromLonLat([102.439722, 37.358333]),
          fromLonLat([94.866667, 40.305833]),
          fromLonLat([91.745833, 42.230278]),
          fromLonLat([87.983333, 44.173333]),
          fromLonLat([82.888333, 46.865]),
          fromLonLat([79.148889, 47.189444]),
          fromLonLat([77.6275, 46.273611]),
          fromLonLat([64.0, 42.402778]),
          fromLonLat([59.667383, 41.343419]),
          fromLonLat([51.498897, 40.724981]),
          fromLonLat([50.435556, 40.678889]),
          fromLonLat([42.859722, 41.6725]),
          fromLonLat([34.594722, 41.746111]),
          fromLonLat([30.264444, 42.610556]),
          fromLonLat([24.234119, 46.117525]),
          fromLonLat([20.371667, 48.324722]),
          fromLonLat([18.165717, 49.246008]),
          fromLonLat([14.3688, 50.92815]),
          fromLonLat([10.896667, 51.673611]),
          fromLonLat([6.976389, 52.215556]),
          fromLonLat([4.76417, 52.3081]),
        ],
      },
    },
  ],
};

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject),
});

vectorSource.addFeatures([
  new Feature(new Circle(fromLonLat([113.591389, 22.149444]), 2481309)),
  new Feature(new Circle(fromLonLat([87.474167, 43.907222]), 2481309)),
  new Feature(new Circle(fromLonLat([50.046667, 40.4675]), 2481309)),
  new Feature(new Circle(fromLonLat([19.261944, 47.439444]), 2481309)),
]);

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction,
  declutter: true,
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorLayer,
  ],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
