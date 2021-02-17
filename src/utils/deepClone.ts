type ClonedObject = {
    [_: string]: ClonedValue
}

type ClonedValue = ClonedValue[] | ClonedObject | number | string | boolean | null

export function deepClone<T>(object: T) {
    const clone: ClonedObject = {}

    for (const [key, v] of Object.entries(object)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        clone[key] = cloneValue(v)
    }

    return clone as unknown as T
}

export function cloneValue(value: ClonedValue): ClonedValue {
    if (Array.isArray(value)) {
        return value.map((item) => cloneValue(item))
    }

    if (typeof value === 'object' && value !== null) {
        return deepClone(value)
    }

    return value
}
