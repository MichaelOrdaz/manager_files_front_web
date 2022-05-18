import dayjs from 'dayjs'
import preset from 'dayjs/locale/es-mx'

export default function formatDate(date: string, format= 'YYYY-MMMM-DDDD') {
    return dayjs(date).locale(preset).format(format) ?? 'Sin formato'
}
