export function transformWords(num: number, words: string[]) {  
	let n = num % 10;
    
	if (num > 10 && num < 20) return `${num} ${words[2]}`;
	if (n > 1 && n < 5) return `${num} ${words[1]}`;
	if (n === 1) return `${num} ${words[0]}`;
    
	return `${num} ${words[2]}`;
}

export const formattedDate = (dateStr: string) => {
    const postDate = new Date(dateStr);
    const day = postDate.getDate();
    const month = postDate.getMonth() + 1;
    const year = postDate.getFullYear() % 100;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year < 10 ? `0${year}` : year;
    
    return `${formattedDay}.${formattedMonth}.20${formattedYear}`;
}