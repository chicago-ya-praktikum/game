export type FormField = {
    id: string,
    label: string,
    val: string,
    err: boolean,
    required?: boolean,
    tip?: string,
    type?: string
}

export type AuxProps = {
    val?: string,
    err?: boolean,
    required?: boolean,
    tip?: string,
    type?: string
}

export class FormState {
}
