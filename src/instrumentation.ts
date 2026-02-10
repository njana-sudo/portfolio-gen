export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const originalEmitWarning = process.emitWarning;
        process.emitWarning = (warning, ...args) => {
            // Suppress DEP0169: url.parse()
            if (
                (typeof warning === 'string' && warning.includes('DEP0169')) ||
                (typeof warning === 'string' && warning.includes('url.parse')) ||
                ((warning as any)?.code === 'DEP0169')
            ) {
                return;
            }
            // @ts-ignore
            return originalEmitWarning.apply(process, [warning, ...args]);
        };
    }
}
