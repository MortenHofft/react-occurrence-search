import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaG9mZnQiLCJhIjoiY2llaGNtaGRiMDAxeHNxbThnNDV6MG95OSJ9.p6Dj5S7iN-Mmxic6Z03BEA";

const styles = {
  mapArea: {
    flex: "1 1 100%",
    display: "flex",
    height: "100%",
    maxHeight: "100vh",
    flexDirection: "column"
  },
  map: {
    flex: "1 1 100%",
    border: "1px solid #ddd",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    "& canvas:focus": {
      outline: "none"
    }
  }
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.addLayer = this.addLayer.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
    this.myRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.myRef.current,
      style: "mapbox://styles/mapbox/light-v9",
      zoom: sessionStorage.getItem('mapZoom') || 0,
      center: [sessionStorage.getItem('mapLng') || 0, sessionStorage.getItem('mapLat') || 0]
    });
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left');
    this.map.on("load", this.addLayer);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filterHash !== this.props.filterHash) {
			this.updateLayer();
    }
  }

  updateLayer() {
    var layer = this.map.getSource("occurrences");
    if (layer) {
      this.map.removeLayer("occurrences");
      this.map.removeSource("occurrences");
      this.addLayer();
    } else {
      this.addLayer();
    }
  }

  addLayer() {
    let filter = this.props.filter;
    filter = this.props.api.compose(filter).build();
    var tileString =
      //"https://esmap.gbif-dev.org/api/tile/{x}/{y}/{z}.mvt?field=coordinates&url=" +
      // "http://labs.gbif.org:7012/api/tile/point/{x}/{y}/{z}.mvt?field=coordinates&url=" +
      // "http://localhost:3000/api/tile/significant/{x}/{y}/{z}.mvt?field=coordinate_point&significantField=backbone.speciesKey&url=" +
      "http://localhost:3001/api/tile/point/{x}/{y}/{z}.mvt?field=coordinates&url=" +
      encodeURIComponent(`http:${this.props.api.esEndpoint}/_search?`) +
      "&filter=" +
      JSON.stringify(filter.query);
    this.map.addLayer(
      {
        id: "occurrences",
        type: "circle",
        source: {
          type: "vector",
          tiles: [tileString]
        },
        "source-layer": "occurrences",
        paint: {
          // make circles larger as the user zooms from z12 to z22
          "circle-radius": {
            property: "count",
            type: "interval",
            stops: [[0, 2], [10, 3], [100, 5], [1000, 8], [10000, 15]]
          },
          // color circles by ethnicity, using data-driven styles
          "circle-color": {
            property: "count",
            type: "interval",
            stops: [
              [0, "#fed976"], //#b99939
              [10, "#fd8d3c"],
              [100, "#fd8d3c"], //#b45100
              [1000, "#f03b20"], //#a40000
              [10000, "#bd0026"]
            ] //#750000
          },
          "circle-opacity": {
            property: "count",
            type: "interval",
            stops: [[0, 1], [10, 0.8], [100, 0.7], [1000, 0.6], [10000, 0.6]]
          },
          "circle-stroke-color": {
            property: "count",
            type: "interval",
            stops: [
              [0, "#fe9724"], //#b99939
              [10, "#fd5b24"],
              [100, "#fd471d"], //#b45100
              [1000, "#f01129"], //#a40000
              [10000, "#bd0047"]
            ] //#750000
          },
          "circle-stroke-width": {
            property: "count",
            type: "interval",
            stops: [[0, 1], [10, 0]]
          }
        }
      },
      "poi-scalerank2"
    );

    const map = this.map
    map.on('zoomend', function () {
      const center = map.getCenter();
      sessionStorage.setItem('mapZoom', map.getZoom());
      sessionStorage.setItem('mapLng', center.lng);
      sessionStorage.setItem('mapLat', center.lat);
    });
    map.on('moveend', function () {
      const center = map.getCenter();
      sessionStorage.setItem('mapZoom', map.getZoom());
      sessionStorage.setItem('mapLng', center.lng);
      sessionStorage.setItem('mapLat', center.lat);
    });

    // let map = this.map;
    // this.map.on('click', 'occurrences', function(e) {
    //   // Change the cursor style as a UI indicator.
    //   map.getCanvas().style.cursor = 'pointer';

    //   // Populate the popup and set its coordinates
    //   // based on the feature found.
    //   console.log(e.features[0].properties.species);
    //   if (e.features[0].properties.species) {
    //       new mapboxgl.Popup({closeButton: false})
    //           .setLngLat(e.lngLat)
    //           .setHTML(e.features[0].properties.species + <span>tester</span>)
    //           .addTo(map);
    //   }
    // });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mapArea}>
        <div ref={this.myRef} className={classes.map} />
      </div>
    );
  }
}

export default injectSheet(styles)(Map);
