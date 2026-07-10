export function isValidCpf(rawCpf: string): boolean {
    const cpf = rawCpf.replace(/\D/g, ""); 
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    const digits = cpf.split("").map(Number); 

    const calcCheckDigit = (sliceLength: number) => {
        let sum = 0;
        for (let i = 0; i < sliceLength; i++){
            sum += digits[i] * (sliceLength + 1 - i);
        }
        const rest = sum % 11;
        return rest < 2 ? 0 : 11 - rest;
    }; 

    return calcCheckDigit(9) === digits[9] && calcCheckDigit(10) === digits[10];
}
