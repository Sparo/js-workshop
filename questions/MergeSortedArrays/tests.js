module.exports = [
    {
        description: 'both arrays are empty',
        case: [[], []],
        toBe: []
    },
    {
        description: 'first array is empty',
        case: [[], [1, 2, 3]],
        toBe: [1, 2, 3]
    },
    {
        description: 'second array is empty',
        case: [[5, 6, 7], []],
        toBe: [5, 6, 7]
    },
    {
        description: 'both arrays have some numbers',
        case: [[2, 4, 6], [1, 3, 7]],
        toBe: [1, 2, 3, 4, 6, 7]
    },
    {
        description: 'arrays are different lengths',
        case: [[2, 4, 6, 8], [1, 7]],
        toBe: [1, 2, 4, 6, 7, 8]
    }
];