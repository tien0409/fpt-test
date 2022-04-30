import {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import H from "@here/maps-api-for-javascript";

import styles from "./DisplayMap.module.scss";

const MARKER_SIZE = 10;

const DisplayMap: FC = () => {
  const mapRef = useRef<HTMLElement>();
  const [map, setMap] = useState<H.Map>();
  const [lineString, setLineString] = useState<H.geo.LineString>(
    new H.geo.LineString()
  );
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [renderingParams, setRenderingParams] =
    useState<H.map.render.RenderingParams>();
  const [points, setPoints] = useState<H.geo.IPoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false); // false: end, true: start

  useMemo(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (mapRef.current) {
        const platform = new H.service.Platform({
          apikey: "pnYh4cMYuMq1VQ6Dn7Af1yz-L5GP1Bt1t9LYvMZAZIs",
        });
        const layers = platform.createDefaultLayers();
        const mapObj = new H.Map(mapRef.current, layers.vector.normal.map, {
          pixelRatio: window.devicePixelRatio,
          center: { lat, lng },
          zoom: 5,
        });
        mapObj.addLayer(
          new H.map.layer.CanvasLayer(function (
            ctx: CanvasRenderingContext2D | WebGLRenderingContext,
            renderingParams
          ) {
            if (ctx instanceof WebGLRenderingContext)
              return H.map.render.RenderState.PENDING;

            setCtx(ctx);
            setRenderingParams(renderingParams);
            return H.map.render.RenderState.DONE;
          })
        );
        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(mapObj)
        );
        behavior.disable(H.mapevents.Behavior.Feature.DBL_TAP_ZOOM);
        H.ui.UI.createDefault(mapObj, layers);

        setMap(mapObj);
      }
    });
  }, []);

  const handleEndDraw = useCallback(() => {
    if (map) {
      for (const lineObj of map.getObjects()) {
        if (lineObj instanceof H.map.Polyline) {
          map.removeObject(lineObj);
        }
      }

      map.addObject(
        new H.map.Polygon(lineString, {
          style: { lineWidth: 4 },
        } as any)
      );
      setIsDrawing(false);
      setPoints([]);
      setLineString(new H.geo.LineString());

      if (ctx && renderingParams) {
        ctx.clearRect(0, 0, renderingParams.size.w, renderingParams.size.h);
      }
    }
  }, [ctx, lineString, map, renderingParams]);

  const handleToggleDraw = useCallback(
    (e: any) => {
      const { viewportX, viewportY } = e.currentPointer;
      const coord = map?.screenToGeo(viewportX, viewportY);
      if (points[0]) {
        const lastPointCoord = map?.geoToScreen(points[0]);
        if (
          Math.abs((lastPointCoord?.x || 0) - viewportX) <= MARKER_SIZE / 2 &&
          Math.abs((lastPointCoord?.y || 0) - viewportY) <= MARKER_SIZE / 2
        ) {
          handleEndDraw();
          lineString.pushPoint(points[0]);
          map?.addObject(
            new H.map.Polyline(lineString, {
              style: { lineWidth: 4 },
            } as any)
          );
          return;
        }
      }
      const pos: H.geo.IPoint = {
        lat: coord?.lat ?? 0,
        lng: coord?.lng ?? 0,
      };

      lineString.pushPoint(pos);
      setPoints([...points, pos]);

      // danh dau diem
      const markerEl = document.createElement("div");
      markerEl.style.cursor = "pointer";
      markerEl.style.width = `${MARKER_SIZE}px`;
      markerEl.style.height = `${MARKER_SIZE}px`;
      markerEl.style.marginTop = `-${MARKER_SIZE / 2}px`;
      markerEl.style.marginLeft = `-${MARKER_SIZE / 2}px`;
      markerEl.style.position = "relative";
      markerEl.style.userSelect = "none";
      markerEl.style.borderRadius = "50%";
      markerEl.style.backgroundColor = "transparent";
      const domIcon = new H.map.DomIcon(markerEl);
      const markerObj = new H.map.DomMarker(pos, {
        icon: domIcon,
      } as H.map.DomMarker.Options);
      map?.addObject(markerObj);

      if (!isDrawing) {
        setIsDrawing(true);
      } else {
        map?.addObject(
          new H.map.Polyline(lineString, {
            style: { lineWidth: 4 },
          } as any)
        );
      }
    },
    [handleEndDraw, isDrawing, lineString, map, points]
  );

  const handlePreviewDraw = useCallback(
    (e: any) => {
      if (!isDrawing) return;

      if (ctx && renderingParams) {
        ctx.clearRect(0, 0, renderingParams.size.w, renderingParams.size.h);
        const lastPos = map?.geoToScreen({
          lat: points.at(-1)?.lat || 0,
          lng: points.at(-1)?.lng || 0,
        });
        if (lastPos) {
          ctx.strokeStyle = "red";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(lastPos.x, lastPos.y);
          ctx.lineTo(e.currentPointer.viewportX, e.currentPointer.viewportY);
          ctx.stroke();
        }
      }
    },
    [ctx, isDrawing, map, points, renderingParams]
  );

  useEffect(() => {
    if (map) {
      map.addEventListener("tap", handleToggleDraw);
      map.addEventListener("pointermove", handlePreviewDraw);
    }

    return () => {
      if (map) {
        map.removeEventListener("tap", handleToggleDraw);
        map.removeEventListener("pointermove", handlePreviewDraw);
      }
    };
  }, [map, handlePreviewDraw, handleToggleDraw]);

  return (
    <div
      onDoubleClick={handleEndDraw}
      className={clsx(styles.container)}
      ref={mapRef as RefObject<HTMLDivElement>}
    ></div>
  );
};

export default DisplayMap;
