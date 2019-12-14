import React, { useContext, forwardRef } from "react";
import _find from 'lodash/find';
import _get from 'lodash/get';
import { Poi } from './Props';
import ConfigContext from '../../../config-provider/context';

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
}

export interface InternalPlaceSearchProps extends PlaceSearchProps {
  __map__: any;
  setLocale: { placeholder: string };
}

interface InternalPlaceSearchState {
  tips: Tip[],
}

class InternalPlaceSearch extends React.Component<InternalPlaceSearchProps, InternalPlaceSearchState> {
  constructor(props: InternalPlaceSearchProps) {
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
    const placeholder = _get(setLocale, 'placeholder');
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
  const { afmLocale: { map } } = useContext(ConfigContext);
  const forwardProps = {
    setLocale: {
      placeholder: map.addressInputPlaceholder,
    },
    ...props,
    ref,
  } as any;
  return <InternalPlaceSearch {...forwardProps} />;
})
