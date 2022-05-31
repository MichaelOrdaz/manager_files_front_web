
export default function useGenerateRandomColorClass () {
    const colorsClasses = ['primary', 'secondary', 'ocean', 'vegetation', 'red',
        'gold', 'brown-3', 'brown-4', 'brown-5',
        'brown-6', 'pink-2']
    return colorsClasses[Math.floor((Math.random() * colorsClasses.length))]
}
