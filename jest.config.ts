
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    "^.+\\.(ts|tsx|jsx)$": "ts-jest", // Transforma archivos TypeScript
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js', // Mocks para estilos
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js' // Mocks para imágenes
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Ajusta según la estructura de tu proyecto
  },
  // Asegúrate de tener una configuración para los assets que están siendo importados
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};