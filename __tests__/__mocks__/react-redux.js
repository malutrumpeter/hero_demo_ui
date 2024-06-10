
const mockDispatch = jest.fn();

module.exports = {
    useDispatch: jest.fn(() => mockDispatch),
    useSelector: jest.fn(),
}
