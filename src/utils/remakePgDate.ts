export const remakePgDate = (dateStr: string): string => {
    const date = new Date(dateStr.replace(' ', 'T'))

    const options: Intl.DateTimeFormatOptions = {
        era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }

    return date.toLocaleString('ru', options)
}
