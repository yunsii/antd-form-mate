import React, { useState, useEffect } from "react";
import _find from 'lodash/find';
import _get from 'lodash/get';
import { Poi } from './Props';
import { useIntl } from "../../../intl-context";

export interface AutocompleteResult {
  count: number;
  info: "OK" | "NO_DATA";
  tips: Tip[];
  type: "complete";
}

export interface SelectItem {
  type: "select";
  poi: Poi;
}

export interface Tip extends Poi { }

export interface PlaceSearchProps {
  onPlaceSelect?: (poi: Poi) => void;
  style?: React.CSSProperties;
  __map__?: any;
}

const PlaceSearch: React.FC<PlaceSearchProps> = (props) => {
  const {
    __map__: map,
    onPlaceSelect = () => { },
    style: customStyle,
  } = props;

  if (!map) {
    throw new Error("PlaceSearch has to be a child of Map component");
  }

  const intl = useIntl();
  const [tips, setTips] = useState<Tip[]>([]);

  const select = (e: SelectItem) => {
    const setCenterAndPoi: () => [any, Poi] | [] = () => {
      if (!e.poi.location) {
        const item = _find(tips, 'location');
        const { location } = item || {};
        return item && location ? [{ lng: location.lng, lat: location.lat, }, item] : [];
      } else {
        const { location } = e.poi;
        return [{ lng: location.lng, lat: location.lat, }, e.poi];
      }
    }
    const [center, poi] = setCenterAndPoi();
    if (center && poi) {
      map.setCenter(new window.AMap.LngLat(center.lng, center.lat));
      onPlaceSelect(e.poi);
    }
  }

  useEffect(() => {
    if (!map) return;

    const auto = new window.AMap.Autocomplete({
      input: "placeSearch",
    });
    // const placeSearch = new window.AMap.PlaceSearch({
    //   map
    // });  // 构造地点查询类
    // placeSearch.search(e.poi.name);  // 关键字查询查询
    // placeSearch.setCity(e.poi.adcode);

    window.AMap.event.addListener(auto, "select", select); // 注册监听，当选中某条记录时会触发
    window.AMap.event.addListener(auto, "complete", (res: AutocompleteResult) => {
      console.log(res);
      setTips(res.tips);
    }); // 注册监听，当查询完成时触发
  }, []);

  const style = {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#fff",
    width: 210,
    ...customStyle
  };

  return <input id="placeSearch" style={style as any} placeholder={intl.getMessage('map.addressInputPlaceholder', '请输入地址')} />;
}

export default PlaceSearch;
