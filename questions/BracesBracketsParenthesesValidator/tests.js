module.exports = [
    {
        description: 'valid short code',
        case: ['()'],
        toBe: true
    },
    {
        description: 'valid longer code',
        case: ['([a, b, c]{12, [55, 66, 99]})[]{{}()}'],
        toBe: true
    },
    {
        description: 'mismatched opener and closer',
        case: ['([][]}'],
        toBe: false
    },
    {
        description: 'missing closer',
        case: ['[[]()'],
        toBe: false
    },
    {
        description: 'extra closer',
        case: ['[[]]())'],
        toBe: false
    },
    {
        description: 'empty string',
        case: [''],
        toBe: true
    },
    {
        description: 'with additional characters',
        case: ['{ a:[c, d], m: [1, 2, 3] }'],
        toBe: true
    },
    {
        description: 'start with closing bracket',
        case: [']{}['],
        toBe: false
    }
];