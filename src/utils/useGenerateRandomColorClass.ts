
export default function useGenerateRandomColorClass () {
    const colorsClasses = ['primary', 'secondary', 'ocean', 'vegetation', 'wealth', 'red',
        'gold', 'brown-3', 'brown-4', 'brown-5',
        'brown-6', 'pink-2', 'gray-6', 'gray-7', 'grey-10',]
    return colorsClasses[Math.floor((Math.random() * colorsClasses.length))]
}
