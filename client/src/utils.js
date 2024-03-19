export const END_POINT = `${process.env.REACT_APP_END_POINT}/chainfaces`

export const formatDate = (date) => {
    const d = new Date(date)
    const day = d.toLocaleDateString('en-GB', { day: 'numeric' })
    const month = d.toLocaleDateString('en-GB', { month: 'short' })
    const year = d.toLocaleDateString('en-GB', { year: 'numeric' })
    const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    return `${time} - ${day} ${month} ${year}`
}