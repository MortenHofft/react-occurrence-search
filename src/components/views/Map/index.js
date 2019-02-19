import React from 'react';
import withContext from '../../../appState/withContext';

const Map = ({components, ...rest}) => {
  const MapView = components.MapView
  return <MapView {...rest} />
}

const mapContextToProps = ({ filter, api, components }) => ({ filter, api, components });
export default withContext(mapContextToProps)(Map);
