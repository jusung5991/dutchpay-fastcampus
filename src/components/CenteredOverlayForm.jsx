import {Container} from "react-bootstrap";
import styled from "styled-components";
import {OverlayWrapper} from "./shared/OverlayWrapper";

export const CenteredOverlayForm = ({children}) => {
    return (
        <CentralizedContainer>
            <StyledHeader>Dutch Pay</StyledHeader>
            <OverlayWrapper>
            {children}
            </OverlayWrapper>
        </CentralizedContainer>
    )
}

const StyledHeader = styled.h1`
    font-weight: 200;
    letter-spacing: 10px;
`

const CentralizedContainer = styled(Container)`
    width: 50vh;
    min-height: 100vh;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
`