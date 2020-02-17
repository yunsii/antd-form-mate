import React, { useContext, useState } from "react";
import { Spin } from "antd";
import { Map, Marker, MapProps } from "react-amap";
import Geolocation from "react-amap-plugin-custom-geolocation";
import CurrentAddress from "./CurrentAddress";
import PlaceSearch from "./PlaceSearch";
import { ConfigContext } from '../../../config-context/context';
import { Position } from './Props';

const defaultPlugins = ["Scale"];

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

function isLocationPosition(locationPosition: Position, position: Position) {
  const {
    lng: locationLng,
    lat: locationLat,
  } = locationPosition;
  const { lng, lat } = position;
  return locationLng === lng && locationLat === lat;
}

export type ErrorType = 'locationError' | 'getFormattedAddress';

export interface AddressInfo {
  lat: number;
  lng: number;
  adcode: string;
  district: string;
  city?: string;
  citycode?: string;
  province?: string;
  street?: string;
  streetNumber?: string;
  township?: string;
}

export interface AMapProps {
  /** position of Marker */
  position?: Position;
  formattedAddress?: string;
  /** AMap wrapper style */
  wrapperStyle?: React.CSSProperties;
  onClick?: (lng: number, lat: number) => void;
  /** get human-readable address */
  getFormattedAddress?: (formattedAddress: string | null, info?: AddressInfo) => void;
  onCreated?: (map: any) => void;
  mapProps?: MapProps;
  onError?: (type: ErrorType, value: any) => void;
  showAddress?: boolean;
}

export const AMap: React.FC<AMapProps> = ({
  position,
  formattedAddress,
  wrapperStyle = {},
  onClick = () => { },
  getFormattedAddress = () => { },
  onCreated = () => { },
  mapProps,
  children,
  onError = () => { },
  showAddress = true,
}) => {
  const { amapKey } = useContext(ConfigContext);
  const [locationPosition, setLocationPosition] = useState<Position>({} as Position);

  const handleCreatedMap = map => {
    onCreated(map);
    if (!geocoder) {
      geocoder = new window.AMap.Geocoder({
        // city: '010', // 城市设为北京，默认：“全国”
        radius: 1000 // 范围，默认：500
      });
    }
  };

  const regeoCode = (longitude: number, latitude: number) => {
    if (geocoder) {
      (geocoder as any).getAddress([longitude, latitude], (status, result) => {
        console.log(status, result);
        if (status === 'complete') {
          const { regeocode: { addressComponent, formattedAddress: resultAddress } } = result;
          getFormattedAddress(resultAddress, {
            lat: latitude,
            lng: longitude,
            ...addressComponent,
          });
        } else {
          onError('getFormattedAddress', { status, result });
          console.error('getFormattedAddress:', status, result);
          getFormattedAddress(null);
        }
      });
    }
  };

  const centerProp = position ? {
    center: position,
  } : {};

  const setHeight = () => {
    const { height } = wrapperStyle;
    if (!showAddress) {
      return height;
    } else if (showAddress && height) {
      return `calc(${height} - ${titleHeight}px)`;
    }
    return defaultMapWrapperHeight;
  }

  const customMap = (
    <div style={{ ...wrapperStyle, height: setHeight() }}>
      <Map
        amapkey={amapKey}
        plugins={defaultPlugins as any}
        events={{
          created: handleCreatedMap,
          click: event => {
            const { lnglat } = event;
            console.log(
              "click position:",
              `${lnglat.getLng()}, ${lnglat.getLat()}`
            );
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
        {position && !isLocationPosition(locationPosition, position) && <Marker position={{ longitude: position.lng, latitude: position.lat }} />}
        <Geolocation
          enableHighAccuracy
          timeout={5000}
          buttonPosition="RB"
          events={{
            created: o => {
              window.AMap.event.addListener(o, "complete", result => {
                const { addressComponent, formattedAddress, position } = result;
                setLocationPosition({
                  lng: result.position.lng,
                  lat: result.position.lat,
                });
                onClick(result.position.lng, result.position.lat);
                getFormattedAddress(formattedAddress, {
                  lat: position.lat,
                  lng: position.lng,
                  ...addressComponent
                });
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
            const { location } = poi;
            if (location) {
              onClick(location.lng, location.lat);
              const address = `${poi.district}${poi.address}${poi.name}`
              getFormattedAddress(address, {
                lat: location.lat,
                lng: location.lng,
                adcode: poi.adcode,
                district: poi.district,
              });
            }
          }}
        />
        {children}
      </Map>
    </div>
  );

  return showAddress ? <CurrentAddress formattedAddress={formattedAddress}>{customMap}</CurrentAddress> : customMap;
}

export default AMap;
