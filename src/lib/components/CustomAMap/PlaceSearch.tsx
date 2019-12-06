import React, { useContext, forwardRef } from "react";
import _find from 'lodash/find';
import _get from 'lodash/get';
import { Poi } from './Props';
import defaultLocal from '../../../defaultLocal';
import ConfigContext from '../../../ConfigContext';

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
  __map__?: any;
  onPlaceSelect?: (poi: Poi) => void;
  style?: React.CSSProperties;
  setLocale?: { placeholder: string };
}

interface PlaceSearchState {
  tips: Tip[],
}

class PlaceSearch extends React.Component<PlaceSearchProps, PlaceSearchState> {
  constructor(props: PlaceSearchProps) {
    super(props);
    const { __map__: map } = props;
    if (!map) {
      throw new Error("PlaceSearch has to be a child of Map component");
    }
    this.state = { tips: [] };
  }

  componentDidMount() {
    const { __map__: map } = this.props;
    if (!map) return;

    const auto = new window.AMap.Autocomplete({
      input: "placeSearch",
    });
    // const placeSearch = new window.AMap.PlaceSearch({
    //   map
    // });  // 构造地点查询类
    // placeSearch.search(e.poi.name);  // 关键字查询查询
    // placeSearch.setCity(e.poi.adcode);

    window.AMap.event.addListener(auto, "select", this.select); // 注册监听，当选中某条记录时会触发
    window.AMap.event.addListener(auto, "complete", (res: AutocompleteResult) => {
      console.log(res);
      this.setState({ tips: res.tips });
    }); // 注册监听，当查询完成时触发
  }

  select = (e: SelectItem) => {
    const { __map__: map, onPlaceSelect = () => { } } = this.props;

    const setCenterAndPoi: () => [any, Poi] | [] = () => {
      if (!e.poi.location) {
        const { tips } = this.state;
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

  render() {
    const { style: customStyle, setLocale } = this.props;
    const placeholder = _get(setLocale, 'placeholder') || defaultLocal.map.addressInputPlaceholder;
    const style = {
      position: "absolute",
      top: "10px",
      left: "10px",
      background: "#fff",
      width: 210,
      ...customStyle
    };

    return <input id="placeSearch" style={style as any} placeholder={placeholder} />;
  }
}

export default forwardRef<React.ComponentClass, PlaceSearchProps>((props, ref) => {
  const { setLocale } = useContext(ConfigContext);
  const forwardProps = {
    setLocale: {
      placeholder: _get(setLocale, 'pictureWall.addressInputPlaceholder'),
    },
    ...props,
    ref,
  } as any
  return <PlaceSearch {...forwardProps} />;
})
