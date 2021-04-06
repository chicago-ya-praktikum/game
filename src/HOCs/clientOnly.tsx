import React from 'react'

export const clientOnly = (WrappedComponent: React.ComponentType) => () => (
    <>
        {IS_CLIENT && <WrappedComponent/>}
    </>
)
