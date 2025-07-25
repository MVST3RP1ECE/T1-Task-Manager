/**
 * Получение времени создания задачи
 * @returns string
 */
export function getCreatedTime() {
    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // Месяцы с 0
    const year = now.getFullYear()

    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes} ${day}.${month}.${year}`
}
