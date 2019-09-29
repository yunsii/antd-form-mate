import * as React from 'react';
import AMap from '../../src/lib/components/CustomAMap';

const { useState } = React;

export default function () {
  const [position, setPosition] = useState();
  return (
    <AMap
      wrapperStyle={{ height: '100vh' }}
      position={position}
      onClick={(longitude, latitude) => setPosition({ longitude, latitude })}
    />
  )
}
