type Listener<T> = ((val: Value<T>) => void)
type Value<T> = T | undefined

export class UpdateListener<T> {
    private _value: Value<T>

    listeners: Listener<T>[] = []

    set value(val: Value<T>) {
        this._value = val
        this.listeners.forEach((l) => l(val))
    }

    get value(): Value<T> {
        return this._value
    }

    subscribe(listener: Listener<T>) {
        this.listeners.push(listener)
    }

    unsubscribe(listener: Listener<T>) {
        this.listeners = this.listeners
            .filter((callback) => listener !== callback)
    }
}
