export const levelGenerator = IS_CLIENT ? new Worker(new URL('./levelGenerator', import.meta.url)) : null
