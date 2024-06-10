import {Button, Container, Form, Row} from "react-bootstrap";
import styled from "styled-components";
import {OverlayWrapper} from "./shared/OverlayWrapper";
import {ServiceLogo} from "./shared/ServiceLogo";

export const CenteredOverlayForm = ({title, children, validated, handleSubmit}) => {
    return (
        <CentralizedContainer>

        <ServiceLogo />

            <OverlayWrapper>

                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <StyledRow>
                            <Row className="align-items-start">
                                <StyledTitle>{title}</StyledTitle>
                            </Row>
                            <Row className="align-items-center">
                                {children}
                            </Row>
                            <Row className="align-items-end">
                                <StyledSubmitButton>저장</StyledSubmitButton>
                            </Row>
                        </StyledRow>
                    </Form>
                </Container>

            </OverlayWrapper>
        </CentralizedContainer>
    )
}



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
 const StyledTitle = styled.h2`
    font-weight: 700;
    line-height: 35px;
    text-align: right;
    overflow-wrap: break-word;
    word-break: keep-all;
`
 const StyledSubmitButton = styled(Button).attrs({
    type: 'submit'
})
    `
    background-color: #6610F2;
    border-radius: 8px;
    border: none;
    
    &:hover {
        background-color: #6610F2;
        filter: brightness(80%);
    }
`

const StyledRow = styled(Row)`
    height: 60vh;
`
