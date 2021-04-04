export const levelGenerator = IS_SERVER ? null : new Worker(new URL('./levelGenerator', import.meta.url))
