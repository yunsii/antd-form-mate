import React, { Fragment, useState, CSSProperties } from "react";
import { Spin } from "antd";
import { Map, Marker, MapProps } from "react-amap";
import Geolocation from "react-amap-plugin-custom-geolocation";
import PlaceSearch from "./PlaceSearch";
import { isDevelopEnv } from '../../../utils';
import { mapConfig } from '../../../config';

let geocoder = null;
const defaultMapWrapperHeight = 400;
const titleHeight = 37;
const spinHight = 16;

export const geoCode = (address, callback) => {
  if (geocoder) {
    (geocoder as any).getLocation(address, callback);
  }
  // geocoder.getLocation(address, (status, result) => {
  //   console.log(address);
  //   console.log(status);
  //   console.log(result);
  //   if (status === 'complete' && result.geocodes.length) {
  //     return result.geocodes[0];
  //   }
  //   console.error('根据地址查询位置失败');
  //   return {};
  // });
};

function isLocationPosition(locationPosition, position) {
  const {
    longitude: locationLongitude,
    latitude: locationLatitude
  } = locationPosition;
  const { longitude, latitude } = position;
  return locationLongitude === longitude && locationLatitude === latitude;
}

export type ErrorType = 'locationError' | 'getFormattedAddress';

export interface AMapProps {
  /** position of Marker */
  position?: {
    longitude: number,
    latitude: number,
  };
  /** AMap wrapper style */
  wrapperStyle?: CSSProperties;
  onClick?: (longitude: number, latitude: number) => void;
  /** get human-readable address */
  getFormattedAddress?: (formattedAddress: string) => void;
  onCreated?: (map: any) => void;
  mapProps?: MapProps;
  children?: React.ReactChildren;
  onError?: (type: ErrorType, value: any) => void;
}

export function AMap({
  position,
  wrapperStyle = {},
  onClick = () => { },
  getFormattedAddress = () => { },
  onCreated = () => { },
  mapProps,
  children,
  onError = () => { },
}: AMapProps) {
  const [locationPosition, setLocationPosition] = useState({});
  const [formattedAddress, setFormattedAddress] = useState();

  const handleCreatedMap = map => {
    onCreated(map);
    if (!geocoder) {
      geocoder = new window.AMap.Geocoder({
        // city: '010', // 城市设为北京，默认：“全国”
        radius: 1000 // 范围，默认：500
      });
    }
  };

  const regeoCode = (longitude, latitude) => {
    if (geocoder) {
      (geocoder as any).getAddress([longitude, latitude], (status, result) => {
        const address = status === "complete" ? result.regeocode.formattedAddress : null;
        getFormattedAddress(address);
        if (!address) {
          onError('getFormattedAddress', address);
          console.error('getFormattedAddress:', address);
        }
        setFormattedAddress(address);
      });
    }
  };

  const plugins = ["Scale"];

  let renderFormattedAddress = "（请选择地址）";
  if (formattedAddress) {
    renderFormattedAddress = formattedAddress;
  }

  const centerProp = position ? {
    center: position,
  } : {};

  const { height } = wrapperStyle;
  return (
    <Fragment>
      <p style={{ margin: '8px 0' }}>当前地址：{renderFormattedAddress}</p>
      <div
        style={
          Object.keys(wrapperStyle).length
            ? { ...wrapperStyle, height: height ? `calc(${height} - ${titleHeight}px)` : defaultMapWrapperHeight }
            : { height: defaultMapWrapperHeight }
        }
      >
        <Map
          amapkey={mapConfig.amapKey}
          plugins={plugins as any}
          events={{
            created: handleCreatedMap,
            click: event => {
              const { lnglat } = event;
              if (isDevelopEnv()) {
                console.log(
                  "click position:",
                  `${lnglat.getLng()}, ${lnglat.getLat()}`
                );
              }
              onClick(lnglat.getLng(), lnglat.getLat());
              regeoCode(lnglat.getLng(), lnglat.getLat());
            }
          }}
          version="1.4.14&plugin=AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch"
          loading={
            <Spin
              style={{
                position: 'absolute',
                top: `calc(50% - ${spinHight / 2}px)`,
                left: `calc(50% - ${spinHight / 2}px)`
              }}
            />
          }
          {...centerProp}
          {...mapProps}
        >
          {position && !isLocationPosition(locationPosition, position) ? (
            <Marker position={position} />
          ) : null}
          <Geolocation
            enableHighAccuracy
            timeout={5000}
            buttonPosition="RB"
            events={{
              created: o => {
                window.AMap.event.addListener(o, "complete", result => {
                  setLocationPosition({
                    longitude: result.position.lng,
                    latitude: result.position.lat
                  });
                  onClick(result.position.lng, result.position.lat);
                  getFormattedAddress(result.formattedAddress);
                  setFormattedAddress(result.formattedAddress);
                }); // 返回定位信息
                window.AMap.event.addListener(
                  o,
                  "error",
                  ({ info, message: msg }) => {
                    onError('locationError', { info, message: msg });
                    console.error("location error, info:", info, ", message:", msg);
                  }
                ); // 返回定位出错信息
              }
            }}
          />
          <PlaceSearch
            onPlaceSelect={poi => {
              console.log("PlaceSearch poi", poi);
              onClick(poi.location.lng, poi.location.lat);
              const address = `${poi.district}${poi.address}${poi.name}`
              getFormattedAddress(address);
              setFormattedAddress(address);
            }}
          />
          {children}
        </Map>
      </div>
    </Fragment>
  );
}

export default AMap;
