import React from 'react';
import withContext from '../../../appState/withContext';

const Map = ({components, ...rest}) => {
  const MapView = components.MapView
  return <MapView {...rest} />
}

const mapContextToProps = ({ filter, filterHash, api, components }) => ({ filter, filterHash, api, components });
export default withContext(mapContextToProps)(Map);
