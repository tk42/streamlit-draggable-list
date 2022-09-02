// (1) import Layer
import React from 'react';
import { Streamlit, Theme } from 'streamlit-component-lib';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { Paper, Typography } from '@mui/material';

// (2) Types Layer
export interface Item {
    id: string
    name: string
    order: number
}

function defaultRenderItem(props: InnerThemeProps, item: Item): React.ReactElement {
    return (
        <Paper
            sx={{
                width: props.width ?? '100%',
                backgroundColor: props.theme.backgroundColor,
                padding: 1,
                border: "1px solid " + props.theme.textColor,
            }}
        >
            <Typography
                color={props.theme.textColor}
                fontFamily={props.theme.font}
            >
                {item.name}
            </Typography>
        </Paper>
    )
}

const applyDrag = (arr: Item[], dropResult: DropResult, initSort: boolean) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }

    if (initSort) {
        return result.sort((a: Item, b: Item) => a.order - b.order)
    } else {
        return result.map((item: Item, idx: number) => {
            return { ...item, order: idx };
        });
    }
};

export type ContainerProps = {
    items: Item[]
    renderItem?: (theme: InnerThemeProps, item: Item) => React.ReactElement
    initSort?: boolean
} & InnerThemeProps
type InnerThemeProps = {
    width?: string
    theme: Theme
}
type Props = {
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
} & ContainerProps

// (3) DOM Layer
const ContainerComponent: React.FC<Props> = (props: Props) => (

    <Container
        onDrop={(e: DropResult) => props.setItems(applyDrag(props.items, e, props.initSort ?? false))}
    >
        {
            props.items.map((item: Item) => {
                const innerThemeProps: InnerThemeProps = { "theme": props.theme, "width": props.width }
                return (
                    <Draggable key={item.id}>
                        {props.renderItem ? props.renderItem(innerThemeProps, item) : defaultRenderItem(innerThemeProps, item)}
                    </Draggable>
                );
            })
        }
    </Container >
)

// (4) Container Layer
export const DraggableList: React.FC<ContainerProps> = props => {
    const [items, setItems] = React.useState(props.items);
    React.useEffect(() => {
        Streamlit.setComponentValue(items)
    }, [items])
    return <ContainerComponent {...{ ...props, items, setItems }} />
}

export default DraggableList;
