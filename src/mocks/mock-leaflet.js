const mockLeaflet = {
  map() {
    return {
      setView: jest.fn(),
    };
  },
  icon() {
    return {};
  },
  tileLayer() {
    return {
      addTo: jest.fn(),
    };
  },
  marker() {
    return {
      addTo: jest.fn(),
    };
  },
  LayerGroup() {
    return {
      addTo: jest.fn(),
      addLayer: jest.fn(),
    };
  }
};

export default mockLeaflet;
