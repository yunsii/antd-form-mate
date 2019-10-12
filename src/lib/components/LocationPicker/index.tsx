import React, { Component } from "react";
import { Input, Modal, Icon } from "antd";
import AMap, { ErrorType } from "../CustomAMap/index";

export type Position = {
  longitude: number;
  latitude: number;
};

export type Value = {
  position: Position | undefined,
  formattedAddress: string;
};

export type ErrorType = 'getFormattedAddress'

export interface LocationPickerProps {
  value?: Value;
  onChange?: (value: Value) => void;
  onError: (type: ErrorType, value: any) => void;
  placeholder?: string;
  modalTitle?: string;
}

export interface LocationPickerState {
  mapVisible: boolean;
  position: Position | undefined;
  formattedAddress: undefined | string;
  isMounted: boolean;
}

export default class LocationPicker extends Component<LocationPickerProps, LocationPickerState> {
  map: any;

  state = {
    mapVisible: false,
    position: undefined,
    formattedAddress: '',
    isMounted: false
  };

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  handleMapCreated = map => {
    console.log("amap is created.");
    if (map) this.map = map;
  };

  handleMapClick = (longitude, latitude) => {
    this.setState({
      position: {
        longitude,
        latitude
      }
    });
  };

  handleMapOk = () => {
    const { onChange } = this.props;
    const { position, formattedAddress } = this.state;
    if (onChange) {
      onChange({
        position,
        formattedAddress
      });
    }
    this.setState({
      mapVisible: false
    });
  };

  handleAfterMapClose = () => {
    this.setState({
      position: undefined,
      formattedAddress: undefined
    });
    if (this.map) {
      this.map.clearMap();
    }
  };

  render() {
    const { value = {} as Value, onChange, onError, placeholder, modalTitle, ...rest } = this.props;
    const { mapVisible, position, isMounted } = this.state;
    const { formattedAddress: inputFormattedAddress } = value;

    let map: any = (
      <AMap
        position={position}
        onCreated={this.handleMapCreated}
        onClick={this.handleMapClick}
        getFormattedAddress={(address, info) => {
          console.log(info);
          if (!address) {
            this.setState({
              formattedAddress: '',
            });
            return;
          }
          this.setState({ formattedAddress: address });
        }}
        onError={onError}
      />
    );
    if (!isMounted) map = null;

    return (
      <>
        <Input
          placeholder={placeholder || "请选择地址"}
          {...rest}
          value={inputFormattedAddress}
          suffix={
            <Icon
              type="environment"
              onClick={() => this.setState({ mapVisible: true })}
            />
          }
        />
        <Modal
          title={modalTitle || "高德地图"}
          width={800}
          visible={mapVisible}
          onCancel={() => this.setState({ mapVisible: false })}
          onOk={this.handleMapOk}
          afterClose={this.handleAfterMapClose}
        >
          {map}
        </Modal>
      </>
    );
  }
}
