import { Card, Stack, SvgIconTypeMap, Typography, Zoom } from "@mui/material"
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface AnimatedResultIconProps {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
    caption?: string
    color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
    animation: {
        transitionDelay: number
        transitionDuration: number
    }
}
export const AnimatedResultIcon: React.FC<AnimatedResultIconProps> = (props) => {

    return <>
        <Zoom in style={{ transitionDelay: `${props.animation.transitionDelay}ms`, transitionDuration: `${props.animation.transitionDuration}ms` }}>
            <Card style={{ borderRadius: 20 }} elevation={10}>
                <Stack margin={5}>
                    <span style={{ textAlign: 'center' }}>{<props.icon style={{ fontSize: 100 }} color={props.color} />}</span>
                    {props.caption && <Typography fontSize={20} color={`${props.color}.main`}>{props.caption}</Typography>}
                </Stack>
            </Card>
        </Zoom></>
}