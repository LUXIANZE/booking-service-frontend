import { Button, ButtonProps } from "@mui/material"

export const CustomButton: React.FC<ButtonProps> = (props) => {
    return <>
        <Button {...props} />
    </>
}