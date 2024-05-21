import {CenteredOverlayForm} from "./CenteredOverlayForm";
import {Button, Container, Form, Row} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {groupNameState} from "../state/groupName";
import {useState} from "react";
import styled from "styled-components";

export const CreateGroup = () => {
    const [groupName, setGroupName] = useRecoilState(groupNameState)
    const [validGroupName, setValidGroupName] = useState(false)
    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget
        if(form.checkValidity()) {
            setValidGroupName(true)
        } else {
            event.stopPropagation();
            setValidGroupName(false)
        }
        setValidated(true)
    }
    return (
        <div>
            <CenteredOverlayForm>
                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <StyledRow>
                            <StyledH2 className="align-items-start">
                                <h2>먼저, 더치페이 할 그룹의 이름을 정해볼까요?</h2>
                            </StyledH2>
                            <Row className="align-items-center">
                                <Form.Group controlId={"validationGroupName"}>
                                    <Form.Control type={"text"} required placeholder="2022 제주도 여행"
                                                  onChange={(e) => setGroupName(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
                                        그룹 이름을 입력해 주세요.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="align-items-end">
                                <StyledSubmitButton>저장</StyledSubmitButton>
                            </Row>
                        </StyledRow>
                    </Form>
                </Container>
            </CenteredOverlayForm>
            {/*<CenteredOverlayForm />*/}
        </div>
    )
}

const StyledH2 = styled.h2`
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
