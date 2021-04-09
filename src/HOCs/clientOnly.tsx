import React, {ComponentType} from 'react'

export const clientOnly = (WrappedComponent: ComponentType) => () => (
    <>
        {IS_CLIENT && <WrappedComponent/>}
    </>
)
