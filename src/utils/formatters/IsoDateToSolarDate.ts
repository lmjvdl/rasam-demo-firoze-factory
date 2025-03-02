export default function gregorianToJalali(dateStr: string): string {
    const gDate = new Date(dateStr);
    let gy = gDate.getFullYear();
    let gm = gDate.getMonth() + 1;
    let gd = gDate.getDate();

    const g_d_m = [0, 31, (gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let jy, jm, jd;
    let gy2 = (gm > 2) ? gy + 1 : gy;
    let days = 355666 + (gy2 * 365) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400);
    
    for (let i = 1; i < gm; i++) {
        days += g_d_m[i];
    }
    days += gd;

    jy = -1595 + (33 * Math.floor(days / 12053));
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;

    if (days > 365) {
        jy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
    }

    let jmArray = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    for (jm = 1; jm <= 12 && days >= jmArray[jm]; jm++) {
        days -= jmArray[jm];
    }
    jd = days + 1;

    return `${jy}/${jm}/${jd}`;
}

const date = "2025-02-26T11:14:08.108424+03:30";
