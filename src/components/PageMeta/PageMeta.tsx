import * as React from 'react';
import Helmet from 'react-helmet';

type Props = {
    title?: string;
    description?: string;
};

const cutTags = (text: string = '') => {
    return text.replace(/<\/?.+?>/gi, '');
};

const prepareData = ({ title, description}: Props) => {
    return {
        title: cutTags(title),
        description: cutTags(description).substr(0, 250)
    };
};

function PageMeta(props: Props) {
    const { title, description} = prepareData(props);

    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
        </Helmet>
    );
}

PageMeta.defaultProps = {
    title: 'Site',
    description: null
};

export { PageMeta };
