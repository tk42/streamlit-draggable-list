import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Draggable, { Item, ContainerProps } from '../src/DraggableList';
import { Paper } from '@mui/material';

export default {
    title: 'Draggable',
    component: Draggable,
    argTypes: {
    },
} as Meta;

const items: Item[] = [
    {
        id: "jan",
        order: 1,
        name: "Jan"
    },
    {
        id: "feb",
        order: 2,
        name: "Feb"
    },
    {
        id: "mar",
        order: 3,
        name: "Mar"
    },
    {
        id: "apr",
        order: 4,
        name: "Apr"
    },
    {
        id: "may",
        order: 5,
        name: "May"
    },
    {
        id: "jun",
        order: 6,
        name: "Jun"
    },
    {
        id: "jul",
        order: 7,
        name: "Jul"
    },
    {
        id: "aug",
        order: 8,
        name: "Aug"
    },
    {
        id: "Sep",
        order: 9,
        name: "Sep"
    },
    {
        id: "oct",
        order: 10,
        name: "Oct"
    },
    {
        id: "nov",
        order: 11,
        name: "Nov"
    },
    {
        id: "dec",
        order: 12,
        name: "Dec"
    },
]

function renderItem(item: Item): React.ReactElement {
    return (
        <Paper
            elevation={3}
            square={true}
            sx={{
                width: '10rem',
                padding: 1,
                border: "1px solid black",
                backgroundColor: '#fdf',
            }}
        >
            [id: {item.id}] {item.name} (Order {item.order})
        </Paper>
    )
}

const Template: Story<ContainerProps> = (args) => {
    return <Draggable {...args} />;
};

export const DefaultRenderSample = Template.bind({})
DefaultRenderSample.args = {
    items
}


export const Sample = Template.bind({})
Sample.args = {
    items,
    renderItem
}
