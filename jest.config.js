module.exports = {
    preset: 'react-native',
    roots: [
        '<rootDir>/__tests__'
    ],
    setupFiles: ['<rootDir>/__tests__/setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/__tests__/setup.ts',
        '<rootDir>/__tests__/__mocks__/'
    ]
};
