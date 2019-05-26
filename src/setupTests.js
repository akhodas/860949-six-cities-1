import mockLeaflet from './mocks/mock-leaflet';

jest.mock(`leaflet`, () => mockLeaflet);
